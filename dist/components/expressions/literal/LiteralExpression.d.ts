import { Expression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
export declare abstract class LiteralExpression<T> extends Expression {
    private readonly value;
    constructor(value: any);
    getValue(): T;
    protected abstract parseValue(value: any): T;
    evaluate(visitor: OclExecutionContext): T;
}
