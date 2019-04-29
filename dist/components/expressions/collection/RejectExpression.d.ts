import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
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
export declare class RejectExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
