import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @oclExpression union(c : Collection) : Collection
 * @oclExample self.collection->union(self.anotherCollection)
 */
export class UnionExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        this.getBody().variables = this.variables;
        const body = this.getBody()
            .evaluate(visitor);

        if (source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }

        return [];
    }
}
