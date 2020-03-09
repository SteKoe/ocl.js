import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns true of there is exactly one element matching the given expression, false otherwise.
 *
 * @oclExpression one(expr : oclExpression) : boolean
 * @oclExample self.collection->one(age < 18)
 */
export declare class OneExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
