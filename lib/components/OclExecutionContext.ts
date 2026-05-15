import {Utils, TypeDeterminerFn} from './Utils';
import {InvariantExpression} from './expressions/InvariantExpression';
import {ContextExpression} from './expressions/context/ContextExpression';
import {OclParser} from './parser/OclParser';
import {Expression} from "./expressions";
import {TypeRegistry, EnumRegistry} from './types';
import {IMetamodelProvider} from './IMetamodelProvider';

// Sentinel value to indicate that targetTypeName hasn't been resolved yet
const NOT_RESOLVED = Symbol('NOT_RESOLVED');

export class OclExecutionContext {
    private evaluationResult: boolean | undefined = undefined;
    private readonly failedInvariants: Array<InvariantExpression> = [];
    private registeredTypes: TypeRegistry;
    private registeredEnumerations: EnumRegistry = {};
    private targetTypeName: string | undefined | typeof NOT_RESOLVED = NOT_RESOLVED;
    private readonly evaluatedContexts: Array<ContextExpression> = [];
    private readonly evalutedValues: Map<string, unknown> = new Map<string, unknown>();
    private metamodelProvider: IMetamodelProvider | undefined;
    private typeDeterminerFn: TypeDeterminerFn | undefined;

    constructor(private obj: unknown, private readonly labelsToExecute: Array<string> = []) {
        this.registeredTypes = { ...OclParser.registeredTypes };
        // Defer targetTypeName resolution until after provider is set
        this.targetTypeName = NOT_RESOLVED;
    }

    /**
     * Lazily resolves and returns the target type name for the current object.
     * Uses the metamodel provider if set, otherwise falls back to Utils.getClassName.
     */
    private resolveTargetTypeName(): string | undefined {
        if (this.targetTypeName === NOT_RESOLVED) {
            this.targetTypeName = this.getTypeName(this.obj);
        }
        return this.targetTypeName as string | undefined;
    }

    setEvaluatedValue(expression: Expression, result: unknown): unknown {
        this.evalutedValues.set(expression.getId(), result);
        return result;
    }

    getEvaluatedValues(): Map<string, unknown> {
        return this.evalutedValues;
    }

    addFailedInvariant(inv: InvariantExpression): void {
        this.failedInvariants.push(inv);
    }

    setObjectToEvaluate(obj: unknown): this {
        this.obj = obj;

        return this;
    }

    getObjectToEvaluate(): unknown {
        return this.obj;
    }

    getRegisteredType(targetTypeName: string): TypeRegistry[string] | undefined {
        return this.registeredTypes[targetTypeName];
    }

    setTargetTypeName(name: string): void {
        this.targetTypeName = name;
    }

    getTargetTypeName(): string | undefined {
        return this.resolveTargetTypeName();
    }

    registerTypes(types: TypeRegistry): void {
        this.registeredTypes = { ...this.registeredTypes, ...types };
    }

    setRegisteredEnumerations(enumerations: EnumRegistry): void {
        this.registeredEnumerations = { ...this.registeredEnumerations, ...enumerations };
    }

    getRegisteredEnumeration(key: string): Record<string, unknown> {
        return this.registeredEnumerations[key] ?? {};
    }

    /**
     * Set the metamodel provider for this execution context.
     *
     * @param provider The IMetamodelProvider implementation
     */
    setMetamodelProvider(provider: IMetamodelProvider): void {
        this.metamodelProvider = provider;
        // Reset cached target type name so it gets re-resolved with the provider
        this.targetTypeName = NOT_RESOLVED;
    }

    /**
     * Get the currently configured metamodel provider.
     *
     * @returns The current IMetamodelProvider or undefined
     */
    getMetamodelProvider(): IMetamodelProvider | undefined {
        return this.metamodelProvider;
    }

    /**
     * Check if a metamodel provider is configured.
     *
     * @returns true if a metamodel provider is set
     */
    hasMetamodelProvider(): boolean {
        return this.metamodelProvider !== undefined;
    }

    /**
     * Set the type determiner function for this execution context.
     *
     * @param fn The type determiner function
     */
    setTypeDeterminerFn(fn: TypeDeterminerFn): void {
        this.typeDeterminerFn = fn;
        // Reset cached target type name so it gets re-resolved with the new function
        this.targetTypeName = NOT_RESOLVED;
    }

    /**
     * Get the type name for an object using the configured provider or fallback.
     *
     * Resolution order:
     * 1. If metamodel provider is set, use provider.getTypeName()
     * 2. Otherwise use Utils.getClassName() with the configured typeDeterminerFn
     *
     * @param obj The object to get the type name for
     * @returns The type name or undefined
     */
    getTypeName(obj: unknown): string | undefined {
        if (this.metamodelProvider) {
            return this.metamodelProvider.getTypeName(obj);
        }
        return Utils.getClassName(obj, this.typeDeterminerFn);
    }

    /**
     * Check if an object is an instance of a type or any of its supertypes.
     *
     * If a metamodel provider is set, delegates to provider.isKindOf().
     * Otherwise falls back to JavaScript instanceof check using registered types.
     *
     * @param obj The object to check
     * @param typeName The type name to check against
     * @returns true if the object is an instance of the type or a supertype
     */
    isKindOf(obj: unknown, typeName: string): boolean {
        if (this.metamodelProvider) {
            return this.metamodelProvider.isKindOf(obj, typeName);
        }

        // Fallback to instanceof check using registered types
        const type = this.registeredTypes[typeName];
        if (type && typeof type === 'function') {
            return obj instanceof type;
        }

        return false;
    }

    /**
     * Check if an object is exactly of a specific type (no inheritance).
     *
     * If a metamodel provider is set, delegates to provider.isTypeOf().
     * Otherwise compares type names using getTypeName().
     *
     * @param obj The object to check
     * @param typeName The exact type name to match
     * @returns true if the object is exactly of the specified type
     */
    isTypeOf(obj: unknown, typeName: string): boolean {
        if (this.metamodelProvider) {
            return this.metamodelProvider.isTypeOf(obj, typeName);
        }

        // Fallback to type name comparison
        return this.getTypeName(obj) === typeName;
    }

    getFailedInvariants(): Array<InvariantExpression> {
        return this.failedInvariants;
    }

    getLabelsToExecute(): Array<string> {
        return this.labelsToExecute;
    }

    getEvaluationResult(): boolean | undefined {
        return this.evaluationResult;
    }

    setEvaluationResult(evaluationResult: boolean): void {
        this.evaluationResult = evaluationResult;
    }

    addEvaluatedContext(context: ContextExpression): void {
        this.evaluatedContexts.push(context);
    }

    getEvaluatedContexts(): Array<ContextExpression> {
        return this.evaluatedContexts;
    }
}
