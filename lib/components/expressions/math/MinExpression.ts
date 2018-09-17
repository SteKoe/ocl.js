import {BodyBasedExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';

/**
 * Returns the lowest number of self and *i*.
 *
 * @oclExpression Number::min ( i : Number ) : Number
 * @oclExample 6.max(3) = 3
 */
export class MinExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const body = this.getBody()
            .evaluate(visitor);

        this.getSource().variables = this.variables;
        const left = this.getSource()
            .evaluate(visitor);

        return Math.min(left, body);
    }
}
