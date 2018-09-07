import { LeftRightBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Multiply
 *
 * @oclExpression Symbol: *
 * @oclExample 1 * 2
 */
export declare class MultiplyExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
