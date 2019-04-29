import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * A condition that has to be fulfilled before executing the operation addressed by the parent OperationCallExpression.
 */
export declare class PreExpression extends Expression {
    private value;
    constructor(value: any);
    getValue(): Expression;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
