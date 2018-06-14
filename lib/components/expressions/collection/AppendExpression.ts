import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 */
export class AppendExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        const body = this.getBody() ? this.getBody()
            .evaluate(visitor) : undefined;

        if (Array.isArray(source) && !!body) {
            source.push(body);
        }

        return source;
    }
}
