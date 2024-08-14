import { OclExecutionContext } from '../../OclExecutionContext';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the greatest number of self and *i*.
 *
 * @oclExpression Number::max ( i : Number ) : Number
 * @oclExample 6.max(3) = 6
 */
export class MaxExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const body = this.getBody().evaluate(visitor);
        const left = this.getSource().evaluate(visitor, localVariables);

        return Math.max(left, body);
    }
}
