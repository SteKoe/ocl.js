import {IteratorExpression} from '../Expression';
import {OclExecutionContext} from '../../OclExecutionContext';
import {Utils} from '../../Utils';

/**
 * @oclSpecification
 * The reject operation specifies a subset of a collection.
 * A reject is an operation on a collection and is specified using the arrow-syntax.
 * This results in a collection that removes all the elements from collection for which the boolean-expression evaluates to true.
 * To find the result of this expression, for each element in collection the expression boolean-expression is evaluated.
 * If this evaluates to true, the element is excluded in the result collection, otherwise not.
 *
 * @oclExpression reject(expr : oclExpression) : Collection
 * @oclExample self.customer->reject(underage)
 */
export class RejectExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any {
        const collection = this.getSource()
            .evaluate(visitor);

        if (collection instanceof Array) {
            return collection.filter(c => {
                this.getBody().variables = {};
                if (this.getIterators()) {
                    this.getBody().variables[this.getIterators()[0]] = c;
                } else {
                    const variableName = Utils.getVariableName(this);
                    this.getBody().variables[variableName.getVariable()] = c;
                }

                const visitResult = this.getBody()
                    .evaluate(visitor);

                return !visitResult;
            });
        } else {
            return [];
        }
    }
}
