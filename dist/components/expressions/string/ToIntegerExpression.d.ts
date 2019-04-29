import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Tries to convert a string to a number.
 *
 * @oclExpression String::toInteger () : Number
 * @oclExample "3.414".toInteger()
 */
export declare class ToIntegerExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
