import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the greatest number of self and *i*.
 *
 * @oclExpression Number::max ( i : Number ) : Number
 * @oclExample 6.max(3) = 6
 */
export declare class MaxExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
