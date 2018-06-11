import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Sqrt
 *
 * @oclExpression Symbol: sqrt
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
