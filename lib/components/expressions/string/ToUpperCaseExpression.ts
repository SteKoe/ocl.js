import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a string in upper case
 *
 * @oclExpression toUpperCase() : String
 * @oclExample self.name->toUpperCase()
 */
export class ToUpperCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        return String(source)
            .toUpperCase();
    }
}
