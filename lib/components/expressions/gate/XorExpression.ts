import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * =====    =====   ===========
 * A        B       A xor B
 * =====    =====   ===========
 * false    false   false
 * false    true    true
 * true     false   true
 * true     true    false
 * =====    =====   ===========
 *
 * @oclExample false xor true
 */
export class XorExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return (left || right) && !(left && right);
    }
}
