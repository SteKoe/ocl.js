import * as Expr from './expressions';
import { ContextExpression } from './expressions/context/ContextExpression';
export declare class OclExecutionContext {
    private obj;
    private labelsToExecute;
    private evaluationResult;
    private failedInvariants;
    private registeredTypes;
    private registeredEnumerations;
    private targetTypeName;
    private evaluatedContexts;
    constructor(obj: any, labelsToExecute?: Array<string>);
    addFailedInvariant(inv: Expr.InvariantExpression): void;
    setObjectToEvaluate(obj: any): OclExecutionContext;
    getObjectToEvaluate(): any;
    getRegisteredType(targetTypeName: string): any;
    setTargetTypeName(name: string): void;
    getTargetTypeName(): string;
    registerTypes(types: any): void;
    setRegisteredEnumerations(enumerations: any): void;
    getRegisteredEnumeration(key: any): Array<any>;
    getFailedInvariants(): Array<Expr.InvariantExpression>;
    getLabelsToExecute(): Array<string>;
    getEvaluationResult(): boolean;
    setEvaluationResult(evaluationResult: boolean): void;
    addEvaluatedContext(context: ContextExpression): void;
    getEvaluatedContexts(): Array<ContextExpression>;
}
