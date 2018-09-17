import { LeftRightBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Substraction
 *
 * @oclExpression Symbol: -
 * @oclExample 1 - 2
 */
export declare class SubstractionExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
