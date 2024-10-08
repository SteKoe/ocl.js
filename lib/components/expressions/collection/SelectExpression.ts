import {OclExecutionContext} from '../../OclExecutionContext';
import {IteratorExpression} from "../IteratorExpression";

/**
 * @oclSpecification
 * The select operation specifies a subset of a collection.
 * A select is an operation on a collection and is specified using the arrow-syntax.
 * This results in a collection that contains all the elements from collection for which the boolean-expression evaluates to true.
 * To find the result of this expression, for each element in collection the expression boolean-expression is evaluated.
 * If this evaluates to true, the element is included in the result collection, otherwise not.
 *
 * @oclExpression select(expr : oclExpression) : Collection
 * @oclExample self.collection->select(item | item.name = "random")
 */
export class SelectExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables): any {
        const collection = this.getSource()
            .evaluate(visitor, localVariables);

        if (collection instanceof Array) {
            return collection.filter(c => this.evaluateBody(visitor, localVariables, c));
        } else {
            return [];
        }
    }
}
