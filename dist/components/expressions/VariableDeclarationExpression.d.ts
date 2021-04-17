import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
export declare class VariableDeclarationExpression extends Expression {
    private variableName;
    private optionalDataType;
    private oclExpressionAsValue;
    constructor(variableName: any, optionalDataType: any, oclExpressionAsValue: any);
    getVariableName(): string;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
