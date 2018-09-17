import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @oclExpression union(c : Collection) : Collection
 * @oclExample self.collection->union(self.anotherCollection)
 */
export declare class UnionExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
