import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the square root of *self*.
 *
 * @oclExpression Number::sqrt () : Number
 * @oclExample 9.sqrt() = 3
 */
export declare class SqrtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
