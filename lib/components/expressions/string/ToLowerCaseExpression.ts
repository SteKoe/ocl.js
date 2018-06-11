import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a string in lower case
 *
 * @oclExpression toLowerCase() : String
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        return String(source)
            .toLowerCase();
    }
}
