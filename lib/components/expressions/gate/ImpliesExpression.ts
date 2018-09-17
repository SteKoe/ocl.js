import { LeftRightBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * =====    =====   ===========
 * A        B       A implies B
 * =====    =====   ===========
 * false    false   true
 * false    true    true
 * true     false   false
 * true     true    true
 * =====    =====   ===========
 *
 * @oclExample false implies true
 */
export class ImpliesExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        if (left) {
            return right;
        } else {
            return true;
        }
    }
}
