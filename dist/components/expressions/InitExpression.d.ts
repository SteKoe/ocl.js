import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 */
export declare class InitExpression extends Expression {
    private value;
    constructor(value: any);
    getValue(): Expression;
    evaluate(visitor: OclExecutionContext): any;
}
