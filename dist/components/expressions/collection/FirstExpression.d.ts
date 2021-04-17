import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the first element of the collection.
 *
 * @oclExpression collection->first() : T
 * @oclExample self.collection->first()
 */
export declare class FirstExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
