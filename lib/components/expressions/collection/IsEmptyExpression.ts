import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
export class IsEmptyExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        return Array.isArray(source) ? source.length === 0 : true;
    }
}
