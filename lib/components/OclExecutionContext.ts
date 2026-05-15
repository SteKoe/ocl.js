import {Utils} from './Utils';
import {InvariantExpression} from './expressions/InvariantExpression';
import {ContextExpression} from './expressions/context/ContextExpression';
import {OclParser} from './parser/OclParser';
import {Expression} from "./expressions";
import {TypeRegistry, EnumRegistry} from './types';

export class OclExecutionContext {
    private evaluationResult: boolean | undefined = undefined;
    private readonly failedInvariants: Array<InvariantExpression> = [];
    private registeredTypes: TypeRegistry;
    private registeredEnumerations: EnumRegistry = {};
    private targetTypeName: string | undefined;
    private readonly evaluatedContexts: Array<ContextExpression> = [];
    private readonly evalutedValues: Map<string, unknown> = new Map<string, unknown>();

    constructor(private obj: unknown, private readonly labelsToExecute: Array<string> = []) {
        this.targetTypeName = Utils.getClassName(obj);
        this.registeredTypes = OclParser.registeredTypes;
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
        return this.targetTypeName;
    }

    registerTypes(types: TypeRegistry): void {
        this.registeredTypes = {...this.registeredTypes, ...types};
    }

    setRegisteredEnumerations(enumerations: EnumRegistry): void {
        this.registeredEnumerations = {...this.registeredEnumerations, ...enumerations};
    }

    getRegisteredEnumeration(key: string): Record<string, unknown> {
        return this.registeredEnumerations[key] ?? {};
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
