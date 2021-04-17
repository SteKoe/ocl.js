import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
/**
 * Resolves enumeration values.
 */
export declare class EnumerationExpression extends Expression {
    private readonly enumeration;
    private readonly field;
    constructor(source: any);
    evaluate(visitor: OclExecutionContext): any;
}
