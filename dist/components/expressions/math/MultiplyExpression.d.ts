import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Multiply
 *
 * @oclExpression Symbol: *
 * @oclExample 1 * 2
 */
export declare class MultiplyExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
