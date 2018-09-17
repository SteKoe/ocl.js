import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Appends the given element to the given collection and returns the extended collection.
 *
 * @oclExpression append(elem : T) : Collection<T>
 * @oclExample self.collection->append("string")
 */
export class AppendExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        const body = this.getBody() ? this.getBody()
            .evaluate(visitor) : undefined;

        if (Array.isArray(source) && !!body) {
            source.push(body);
        }

        return source;
    }
}
