import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Appends the given element to the given collection and returns the extended collection.
 *
 * @oclExpression append(elem : T) : Collection<T>
 * @oclExample self.collection->append("string")
 */
export declare class AppendExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
