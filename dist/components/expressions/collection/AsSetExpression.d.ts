import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
export declare class AsSetExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
