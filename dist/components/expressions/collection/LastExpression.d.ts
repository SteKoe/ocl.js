import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the last element of the collection.
 *
 * @oclExpression last() : T
 * @oclExample self.collection->last()
 */
export declare class LastExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
