import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Addition
 *
 * @oclExpression Symbol: +
 * @oclExample 1 + 2
 */
export declare class AdditionExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
