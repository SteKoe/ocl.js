import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return Math.pow(left, right);
    }
}
