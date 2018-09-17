import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * Resolves enumeration values.
 */
export declare class EnumerationExpression extends Expression {
    private enumeration;
    private field;
    constructor(source: any);
    evaluate(visitor: OclExecutionContext): any;
}
