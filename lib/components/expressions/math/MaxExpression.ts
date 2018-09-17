import {BodyBasedExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';

/**
 * Returns the greatest number of self and *i*.
 *
 * @oclExpression Number::max ( i : Number ) : Number
 * @oclExample 6.max(3) = 6
 */
export class MaxExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const body = this.getBody()
            .evaluate(visitor);

        this.getSource().variables = this.variables;
        const left = this.getSource()
            .evaluate(visitor);

        return Math.max(left, body);
    }
}
