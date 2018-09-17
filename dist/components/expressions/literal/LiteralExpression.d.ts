import { Expression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
export declare abstract class LiteralExpression<T> extends Expression {
    private value;
    constructor(value: any);
    getValue(): T;
    abstract parseValue(value: any): T;
    evaluate(visitor: OclExecutionContext): T;
}
