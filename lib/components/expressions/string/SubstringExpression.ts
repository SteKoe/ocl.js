import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';
import {BodyBasedExpression} from "../BodyBasedExpression";
import {Expression} from "../Expression";

/**
 * Returns a string containing all characters from self starting from index *start* up to index *end* included.
 * Both *start* and *end* parameters should be contained between *1* and *self.size()* included.
 * *start* cannot be greater than *end*.
 *
 * @oclExpression String::substring (start : Number, end : Number) : String
 * @oclExample self.name.substring(0,2)
 */
export class SubstringExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables) as string;
        const body = this.getBody();

        if (!body) {
            return source;
        }

        let start: Expression;
        let end: Expression | undefined;
        if (Array.isArray(body)) {
            start = body[0];
            end = body[1];
        } else {
            start = body;
        }

        const startIndex = start.evaluate(visitor, localVariables) as number;
        const endIndex = end ? end.evaluate(visitor, localVariables) as number : source.length;

        return source.substring(startIndex, endIndex);
    }
}
