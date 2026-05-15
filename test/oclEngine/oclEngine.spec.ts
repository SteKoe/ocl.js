import { expect } from 'vitest';
import { OclEngine } from '../../lib';
import { FixtureFactory, MetaAssociationLink, MetaEntity } from '../fixture.factory';

describe('OclEngine', () => {
    it('should evaluate oclExpression for given instance data when all are valid.', () => {
        const metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleB')
        ];

        const rule_distinctRoleNames = `
            context MetaEntity inv:
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `;
        const rule_ifTypeImpliesIntrinsic = `
            context MetaEntity inv:
                self.isType = true implies self.isIntrinsic = false
        `;

        const result = OclEngine.create()
            .addOclExpression(rule_distinctRoleNames)
            .addOclExpression(rule_ifTypeImpliesIntrinsic)
            .evaluate(metaEntity)
            .getResult();
        expect(result).toBe(true);
    });

    it('should evaluate oclExpression for given instance data when one is invalid.', () => {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity inv:
                self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `);
        oclEngine.addOclExpression(`
            context MetaEntity inv:
                self.isType = true implies self.isIntrinsic = false
        `);

        const metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleA')
        ];

        expect(oclEngine.evaluate(metaEntity).getResult()).toBe(false);
    });

    it('should allow to set names for expressions', () => {
        const oclEngine = new OclEngine();
        oclEngine.addOclExpression(`
            context MetaEntity
                inv linkNamesMustBeUnique: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
        `);
        oclEngine.addOclExpression(`
            context MetaEntity inv:
                self.isType = true implies self.isIntrinsic = false
        `);

        const metaEntity = new MetaEntity();
        metaEntity.metaAssociationLinks = [
            new MetaAssociationLink('roleA'),
            new MetaAssociationLink('roleA')
        ];

        const evaluationResult = oclEngine.evaluate(metaEntity);
        expect(evaluationResult.getResult()).toBe(false);
        expect(evaluationResult.getNamesOfFailedInvs()).toContain('linkNamesMustBeUnique');
    });

    it('should allow to add multiple constraints as array', () => {
        const oclConstraints = [
            `
                context MetaEntity
                    inv linkNamesMustBeUnique: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
                `,
            `
                context MetaEntity inv:
                    1=1asdasdsd
                `
        ];

        const oclEngine = new OclEngine();

        try {
            oclEngine.addOclExpressions(oclConstraints);
        } catch (e) {
            expect(e.oclExpression).toStrictEqual(oclConstraints[1]);
        }
    });

    describe('_inferType', () => {
        let oclEngine;

        beforeAll(() => {
            oclEngine = OclEngine.create();
        });

        it('infers types for "simple" objects', () => {
            let actual;

            actual = oclEngine._inferType({});
            expect(actual, '{}').toBe('Object');

            actual = oclEngine._inferType('i am a string');
            expect(actual, 'i am a string').toBeUndefined();

            actual = oclEngine._inferType(1);
            expect(actual, '1').toBeUndefined();

            actual = oclEngine._inferType(FixtureFactory.createPerson('Stephan', 30));
            expect(actual, 'Person').toBe('Person');
        });

        it('infers types based on custom TypeDeterminer', () => {
            // Create a fresh engine for this test to avoid polluting shared state
            const localEngine = OclEngine.create();
            let actual;

            actual = localEngine._inferType({type: 'Edge'});
            expect(actual).toBe('Object');

            localEngine.setTypeDeterminer(obj => obj.type);

            actual = localEngine._inferType({type: 'Edge'});
            expect(actual).toBe('Edge');
        });

        it('should allow to add multiple constraints as array', () => {
            const oclConstraints = [
                `
                context MetaEntity
                    inv linkNamesMustBeUnique: self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)
                `,
                `
                context MetaEntity inv:
                    self.isType = true implies self.isIntrinsic = false
                `
            ];

            oclEngine.addOclExpressions(oclConstraints);

            const metaEntity = new MetaEntity();
            metaEntity.metaAssociationLinks = [
                new MetaAssociationLink('roleA'),
                new MetaAssociationLink('roleA')
            ];

            const evaluationResult = oclEngine.evaluate(metaEntity);
            expect(evaluationResult.getResult()).toBe(false);
            expect(evaluationResult.getNamesOfFailedInvs()).toContain('linkNamesMustBeUnique');
        });

        it('should allow to add multiple constraints as string', () => {
            const oclConstraints = `
                context MetaEntity inv linkNamesMustBeUnique:
                    self.metaAssociationLinks->forAll(a1,a2|a1<>a2 implies a1.roleName <> a2.roleName)

                context MetaEntity inv ifIsTypeItMustNotBeIntrinsic:
                    self.isType = true implies self.isIntrinsic = false
                `
            ;

            oclEngine.addOclExpression(oclConstraints);

            const metaEntity = new MetaEntity();
            metaEntity.metaAssociationLinks = [
                new MetaAssociationLink('roleA'),
                new MetaAssociationLink('roleA')
            ];

            const evaluationResult = oclEngine.evaluate(metaEntity);
            expect(evaluationResult.getResult()).toBe(false);
            expect(evaluationResult.getNamesOfFailedInvs()).toContain('linkNamesMustBeUnique');
        });

        it('should allow to remove OclExpressions', () => {
            oclEngine = OclEngine.create();

            const oclConstraint = `
                context Object inv:
                    true = true
                `
            ;

            oclEngine.addOclExpression('context Object inv: 1 = 1');
            oclEngine.addOclExpression('context Object inv: 2 = 2');
            oclEngine.addOclExpression(oclConstraint);
            expect(oclEngine.packageDeclarations.length).toBe(3);

            oclEngine.removeOclExpression(oclConstraint);
            expect(oclEngine.packageDeclarations.length).toBe(2);
        });

        it('should allow to clear all OclExpressions', () => {
            oclEngine = OclEngine.create();

            const oclConstraint = `
                context Object inv:
                    true = true
                `
            ;

            oclEngine.addOclExpression('context Object inv: 1 = 1');
            oclEngine.addOclExpression('context Object inv: 2 = 2');
            oclEngine.addOclExpression(oclConstraint);
            expect(oclEngine.packageDeclarations.length).toBe(3);

            oclEngine.clearAllOclExpressions();
            expect(oclEngine.packageDeclarations.length).toBe(0);
        });
    });
});

