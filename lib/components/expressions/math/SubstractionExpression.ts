import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Substraction
 *
 * @oclExpression Symbol: -
 * @oclExample 1 - 2
 */
export class SubstractionExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return left - right;
    }
}
