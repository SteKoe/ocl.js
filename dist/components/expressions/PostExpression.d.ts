import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
/**
 * A condition that has to be fulfilled after the operation addressed by the parent OperationCallExpression has been executed.
 */
export declare class PostExpression extends Expression {
    private value;
    constructor(value: any);
    getValue(): Expression;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
