import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
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
