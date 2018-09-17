import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * A condition that has to be fulfilled after the operation addressed by the parent OperationCallExpression has been executed.
 */
export declare class PostExpression extends Expression {
    private value;
    constructor(value: any);
    getValue(): Expression;
    evaluate(visitor: OclExecutionContext): any;
}
