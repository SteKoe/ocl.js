import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Tries to convert a string to a number.
 *
 * @oclExpression String:: toReal () : Number
 * @oclExample "3.414".toReal()
 */
export declare class ToRealExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
