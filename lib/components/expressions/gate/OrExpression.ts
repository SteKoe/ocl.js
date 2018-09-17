import {LeftRightBasedExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';

/**
 * =====    =====   ===========
 * A        B       A or B
 * =====    =====   ===========
 * false    false   false
 * false    true    true
 * true     false   true
 * true     true    true
 * =====    =====   ===========
 *
 * @oclExample false or true
 */
export class OrExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return left || right;
    }
}
