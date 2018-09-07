import { LeftRightBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export declare class DivideExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
