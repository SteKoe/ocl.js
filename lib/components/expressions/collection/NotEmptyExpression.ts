import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns true if self is not empty, false otherwise.
 *
 * @oclExpression notEmpty() : Boolean
 * @oclExample self.cars->notEmpty()
 */
export class NotEmptyExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        return Array.isArray(source) ? source.length !== 0 : false;
    }
}
