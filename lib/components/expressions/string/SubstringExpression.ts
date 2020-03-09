import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a string containing all characters from self starting from index *start* up to index *end* included.
 * Both *start* and *end* parameters should be contained between *1* and *self.size()* included.
 * *start* cannot be greater than *end*.
 *
 * @oclExpression String::substring (start : Number, end : Number) : String
 * @oclExample self.name.substring(0,2)
 */
export class SubstringExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): string {
        const source = this.getSource().evaluate(visitor, localVariables);

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

        const startIndex = start.evaluate(visitor, localVariables);
        const endIndex = end ? end.evaluate(visitor, localVariables) : source.length;

        return source.substring(startIndex, endIndex);
    }
}
