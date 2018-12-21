import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export declare class PowerExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
