import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the lowest number of self and *i*.
 *
 * @oclExpression Number::min ( i : Number ) : Number
 * @oclExample 6.max(3) = 3
 */
export class MinExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const body = this.getBodyAsExpression()?.evaluate(visitor) as number;
        const left = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.min(left, body);
    }
}
