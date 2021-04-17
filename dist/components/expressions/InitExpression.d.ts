import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
/**
 */
export declare class InitExpression extends Expression {
    private readonly value;
    constructor(value: any);
    getValue(): Expression;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
