import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export declare class DivideExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
