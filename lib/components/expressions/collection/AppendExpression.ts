import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Appends the given element to the given collection and returns the extended collection.
 *
 * @oclExpression append(elem : T) : Collection<T>
 * @oclExample self.collection->append("string")
 */
export class AppendExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource()
            .evaluate(visitor, localVariables);

        const body = this.getBody() ? this.getBody()
            .evaluate(visitor, localVariables) : undefined;

        if (Array.isArray(source) && !!body) {
            source.push(body);
        }

        return source;
    }
}
