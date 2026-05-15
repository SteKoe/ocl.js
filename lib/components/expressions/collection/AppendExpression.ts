import { OclExecutionContext } from '../../OclExecutionContext';
import {BodyBasedExpression} from "../BodyBasedExpression";
import {LocalVariables} from "../../types";

/**
 * Appends the given element to the given collection and returns the extended collection.
 *
 * @oclExpression append(elem : T) : Collection<T>
 * @oclExample self.collection->append("string")
 */
export class AppendExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const source = this.getSource()
            .evaluate(visitor, localVariables);

        const body = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (Array.isArray(source) && !!body) {
            source.push(body);
        }

        return source;
    }
}
