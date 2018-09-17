import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
export declare class AtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
