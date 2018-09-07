import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns true if self is not empty, false otherwise.
 *
 * @oclExpression notEmpty() : Boolean
 * @oclExample self.cars->notEmpty()
 */
export declare class NotEmptyExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
