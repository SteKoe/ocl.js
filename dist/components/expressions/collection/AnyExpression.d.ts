import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the first element that validates the given expression.
 *
 * @oclExpression any(expr : OclExpression) : T
 * @oclExample self.collection->any(i < 2)
 */
export declare class AnyExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
