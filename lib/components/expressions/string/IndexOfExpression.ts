import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @oclExpression String::indexOf (s : String) : Number
 * @oclExample self.name.indexOf("string")
 */
export class IndexOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);
        const indexOfString = this.getBody()
            .evaluate(visitor);

        return indexOfString.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    }
}
