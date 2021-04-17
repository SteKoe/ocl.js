import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Substraction
 *
 * @oclExpression Symbol: -
 * @oclExample 1 - 2
 */
export declare class SubstractionExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
