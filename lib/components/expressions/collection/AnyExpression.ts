import {OclExecutionContext} from '../../OclExecutionContext';
import {IteratorExpression} from "../IteratorExpression";

/**
 * Returns the first element that validates the given expression.
 *
 * @oclExpression any(expr : OclExpression) : T
 * @oclExample self.collection->any(i < 2)
 */
export class AnyExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        if (collection instanceof Array) {
            let value = collection.find(c => this.evaluateBody(visitor, localVariables, c));
            visitor.setEvaluatedValue(this, value);
            return value;
        }
    }
}
