import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the lowest number of self and *i*.
 *
 * @oclExpression Number::min ( i : Number ) : Number
 * @oclExample 6.max(3) = 3
 */
export declare class MinExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
