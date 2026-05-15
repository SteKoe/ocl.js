import { expect } from 'vitest';
import { OclEngine, IMetamodelProvider } from '../../lib';

/**
 * Tests for the IMetamodelProvider integration.
 *
 * These tests verify that:
 * 1. oclIsKindOf works with a custom metamodel provider (no JS prototype chain needed)
 * 2. oclIsTypeOf uses the provider's isTypeOf method
 * 3. Context matching uses the provider's type resolution
 * 4. Without a provider, all existing behavior is unchanged
 * 5. Multiple OclEngine instances with different providers don't interfere
 * 6. setTypeDeterminer still works as before (backward compatibility)
 */
describe('IMetamodelProvider', () => {
    /**
     * A simple metamodel with type hierarchy:
     *
     *   NamedElement (abstract)
     *       |
     *   Entity
     *       |
     *   Person
     */
    const metamodel: Record<string, { supertypes: string[] }> = {
        NamedElement: { supertypes: [] },
        Entity: { supertypes: ['NamedElement'] },
        Person: { supertypes: ['Entity'] },
        Company: { supertypes: ['Entity'] },
    };

    /**
     * Check if a type is a subtype of another (including transitive)
     */
    function isSubtypeOf(typeName: string, supertypeName: string): boolean {
        if (typeName === supertypeName) {
            return true;
        }
        const typeInfo = metamodel[typeName];
        if (!typeInfo) {
            return false;
        }
        for (const supertype of typeInfo.supertypes) {
            if (isSubtypeOf(supertype, supertypeName)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Create a metamodel provider that uses the type hierarchy defined above.
     * Objects are plain data with a `_type` property.
     */
    function createProvider(): IMetamodelProvider {
        return {
            getTypeName(obj: unknown): string | undefined {
                if (obj && typeof obj === 'object' && '_type' in obj) {
                    return (obj as { _type: string })._type;
                }
                return undefined;
            },
            isKindOf(obj: unknown, typeName: string): boolean {
                const objType = this.getTypeName(obj);
                if (!objType) {
                    return false;
                }
                return isSubtypeOf(objType, typeName);
            },
            isTypeOf(obj: unknown, typeName: string): boolean {
                return this.getTypeName(obj) === typeName;
            }
        };
    }

    describe('oclIsKindOf with metamodel provider', () => {
        it('should return true when object type matches exactly', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv: self.oclIsKindOf(Person)');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
        });

        it('should return true when object type is a subtype', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv: self.oclIsKindOf(Entity)');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
        });

        it('should return true for transitive supertype', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv: self.oclIsKindOf(NamedElement)');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
        });

        it('should return false when type is not in hierarchy', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv: self.oclIsKindOf(Company)');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(false);
        });
    });

    describe('oclIsTypeOf with metamodel provider', () => {
        it('should return true only for exact type match', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv: self.oclIsTypeOf(Person)');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
        });

        it('should return false for supertype', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv: self.oclIsTypeOf(Entity)');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(false);
        });
    });

    describe('context matching with metamodel provider', () => {
        it('should match context for exact type', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Person inv validName: self.name <> ""');

            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
        });

        it('should match context for subtype (context Entity matches Person)', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Entity inv hasType: self._type <> ""');

            // Person is a subtype of Entity, so this context should apply
            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
        });

        it('should not match context for unrelated type', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider())
                .addOclExpression('context Company inv: false');

            // Person is not a Company, so invariant should not be evaluated
            // Result should be true (no matching invariants means no failures)
            const person = { _type: 'Person', name: 'Alice' };
            const result = engine.evaluate(person);

            expect(result.getResult()).toBe(true);
            expect(result.getEvaluatedContexts().length).toBe(0);
        });
    });

    describe('per-engine isolation', () => {
        it('should allow different providers on different engines', () => {
            // Provider 1: Uses _type property
            const provider1: IMetamodelProvider = {
                getTypeName: (obj: unknown) => (obj as { _type?: string })?._type,
                isKindOf: (obj: unknown, typeName: string) =>
                    (obj as { _type?: string })?._type === typeName,
                isTypeOf: (obj: unknown, typeName: string) =>
                    (obj as { _type?: string })?._type === typeName,
            };

            // Provider 2: Uses $class property
            const provider2: IMetamodelProvider = {
                getTypeName: (obj: unknown) => (obj as { $class?: string })?.$class,
                isKindOf: (obj: unknown, typeName: string) =>
                    (obj as { $class?: string })?.$class === typeName,
                isTypeOf: (obj: unknown, typeName: string) =>
                    (obj as { $class?: string })?.$class === typeName,
            };

            const engine1 = OclEngine.create()
                .setMetamodelProvider(provider1)
                .addOclExpression('context Foo inv: self.oclIsTypeOf(Foo)');

            const engine2 = OclEngine.create()
                .setMetamodelProvider(provider2)
                .addOclExpression('context Bar inv: self.oclIsTypeOf(Bar)');

            const obj1 = { _type: 'Foo' };
            const obj2 = { $class: 'Bar' };

            expect(engine1.evaluate(obj1).getResult()).toBe(true);
            expect(engine2.evaluate(obj2).getResult()).toBe(true);

            // Cross-check: obj1 with provider2 should fail (no $class property)
            expect(engine2.evaluate(obj1).getResult()).toBe(true); // No matching context
        });

        it('should not share state between engines', () => {
            const engine1 = OclEngine.create()
                .setMetamodelProvider(createProvider());

            const engine2 = OclEngine.create();
            // engine2 has no provider

            expect(engine1.getMetamodelProvider()).toBeDefined();
            expect(engine2.getMetamodelProvider()).toBeUndefined();
        });
    });

    describe('backward compatibility', () => {
        it('setTypeDeterminer should still work for simple type name resolution', () => {
            const engine = OclEngine.create()
                .setTypeDeterminer((obj) => (obj as { myType?: string }).myType || 'Unknown')
                .addOclExpression('context MyClass inv: self.oclIsTypeOf(MyClass)');

            const obj = { myType: 'MyClass', value: 42 };
            const result = engine.evaluate(obj);

            expect(result.getResult()).toBe(true);
        });

        it('_inferType should use the type determiner', () => {
            const engine = OclEngine.create()
                .setTypeDeterminer((obj) => (obj as { customType?: string }).customType || 'Fallback');

            const obj = { customType: 'MyType' };
            expect(engine._inferType(obj)).toBe('MyType');
        });

        it('_inferType should use metamodel provider when set', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider());

            const obj = { _type: 'Person' };
            expect(engine._inferType(obj)).toBe('Person');
        });

        it('metamodel provider takes precedence over type determiner', () => {
            const engine = OclEngine.create()
                .setTypeDeterminer(() => 'FromDeterminer')
                .setMetamodelProvider(createProvider());

            const obj = { _type: 'Person' };
            expect(engine._inferType(obj)).toBe('Person');
        });
    });

    describe('without metamodel provider (original behavior)', () => {
        it('oclIsKindOf should use JavaScript instanceof', () => {
            class Animal {}
            class Dog extends Animal {}

            const engine = OclEngine.create()
                .registerTypes({ Animal, Dog })
                .addOclExpression('context Dog inv: self.oclIsKindOf(Animal)');

            const dog = new Dog();
            const result = engine.evaluate(dog);

            expect(result.getResult()).toBe(true);
        });

        it('oclIsTypeOf should compare type names', () => {
            class Cat {
                typeName = 'Cat';
            }

            const engine = OclEngine.create()
                .addOclExpression('context Cat inv: self.oclIsTypeOf(Cat)');

            const cat = new Cat();
            const result = engine.evaluate(cat);

            expect(result.getResult()).toBe(true);
        });
    });

    describe('evaluateQuery with metamodel provider', () => {
        it('should use the provider during query evaluation', () => {
            const engine = OclEngine.create()
                .setMetamodelProvider(createProvider());

            const person = { _type: 'Person', name: 'Bob' };
            const query = engine.createQuery('self.oclIsKindOf(Entity)');
            const result = engine.evaluateQuery(person, query);

            expect(result).toBe(true);
        });
    });
});
