import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the size of the given collection.
 *
 * @oclExpression size() : Number
 * @oclExample self.collection->size()
 */
export declare class SizeExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
