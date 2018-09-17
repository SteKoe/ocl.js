import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the first element of the collection.
 *
 * @oclExpression collection->first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        if (source instanceof Array) {
            return source[0];
        }
    }
}
