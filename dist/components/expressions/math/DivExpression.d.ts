import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the integer quotient of the division of self by *i*.
 *
 * @oclExpression Number::div ( i : Number ) : Number
 * @oclExample 3 div 2 = 1
 */
export declare class DivExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
