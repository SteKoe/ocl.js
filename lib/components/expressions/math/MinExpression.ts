import { OclExecutionContext } from '../../OclExecutionContext';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the lowest number of self and *i*.
 *
 * @oclExpression Number::min ( i : Number ) : Number
 * @oclExample 6.max(3) = 3
 */
export class MinExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const body = this.getBody().evaluate(visitor);
        const left = this.getSource().evaluate(visitor, localVariables);

        return Math.min(left, body);
    }
}
