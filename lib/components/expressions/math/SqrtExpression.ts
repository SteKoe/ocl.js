import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the square root of *self*.
 *
 * @oclExpression Number::sqrt () : Number
 * @oclExample 9.sqrt() = 3
 */
export class SqrtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const sqrt = this.getBody() ? this.getBody()
            .evaluate(visitor) : 2;

        this.getSource().variables = this.variables;
        const left = this.getSource()
            .evaluate(visitor);

        return Math.pow(left, 1 / sqrt);
    }
}
