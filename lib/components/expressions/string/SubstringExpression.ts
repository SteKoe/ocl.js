import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a string in lower case
 *
 * @oclExpression substring(start : Number, end : Number) : String
 * @oclExample self.name->substring(0,2)
 */
export class SubstringExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): string {
        const source = this.getSource()
            .evaluate(visitor);

        if (!this.getBody()) {
            return source;
        }

        let start;
        let end;
        if (Array.isArray(this.getBody())) {
            start = this.getBody()[0];
            end = this.getBody()[1];
        } else {
            start = this.getBody();
        }

        const startIndex = start.evaluate(visitor);
        const endIndex = end ? end.evaluate(visitor) : source.length;

        return source.substring(startIndex, endIndex);
    }
}
