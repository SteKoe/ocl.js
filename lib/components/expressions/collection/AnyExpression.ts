import {OclExecutionContext} from '../../OclExecutionContext';
import {IteratorExpression} from "../IteratorExpression";
import {LocalVariables} from "../../types";

/**
 * Returns the first element that validates the given expression.
 *
 * @oclExpression any(expr : OclExpression) : T
 * @oclExample self.collection->any(i < 2)
 */
export class AnyExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        if (collection instanceof Array) {
            const value = collection.find(c => this.evaluateBodyForItem(visitor, localVariables, c));
            visitor.setEvaluatedValue(this, value);
            return value;
        }

        return undefined;
    }
}
