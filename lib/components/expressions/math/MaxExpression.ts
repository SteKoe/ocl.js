import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the greatest number of self and *i*.
 *
 * @oclExpression Number::max ( i : Number ) : Number
 * @oclExample 6.max(3) = 6
 */
export class MaxExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const body = this.getBodyAsExpression()?.evaluate(visitor) as number;
        const left = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.max(left, body);
    }
}
