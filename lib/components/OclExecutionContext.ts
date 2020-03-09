import { Utils } from './Utils';
import { InvariantExpression } from './expressions/InvariantExpression';
import { ContextExpression } from './expressions/context/ContextExpression';
import { OclParser } from './parser/OclParser';

const a = {
    s: class P {}
};

export class OclExecutionContext {
    private evaluationResult: any = undefined;
    private failedInvariants: Array<InvariantExpression> = [];
    private registeredTypes: any;
    private registeredEnumerations: any;
    private targetTypeName: string;
    private evaluatedContexts: Array<ContextExpression> = [];

    constructor(private obj: any, private labelsToExecute: Array<string> = []) {
        this.targetTypeName = Utils.getClassName(obj);
        this.registeredTypes = OclParser.registeredTypes;
    }

    addFailedInvariant(inv: InvariantExpression): void {
        this.failedInvariants.push(inv);
    }

    setObjectToEvaluate(obj): OclExecutionContext {
        this.obj = obj;

        return this;
    }

    getObjectToEvaluate(): any {
        return this.obj;
    }

    getRegisteredType(targetTypeName: string): any {
        return this.registeredTypes[targetTypeName];
    }

    setTargetTypeName(name: string): void {
        this.targetTypeName = name;
    }

    getTargetTypeName(): string {
        return this.targetTypeName;
    }

    registerTypes(types): void {
        this.registeredTypes = {...this.registeredTypes, ...types};
    }

    setRegisteredEnumerations(enumerations): void {
        this.registeredEnumerations = {...this.registeredEnumerations, ...enumerations};
    }

    getRegisteredEnumeration(key): Array<any> {
        return this.registeredEnumerations[key] || [];
    }

    getFailedInvariants(): Array<InvariantExpression> {
        return this.failedInvariants;
    }

    getLabelsToExecute(): Array<string> {
        return this.labelsToExecute;
    }

    getEvaluationResult(): boolean {
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
