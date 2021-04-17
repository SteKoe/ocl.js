import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
export declare class IsEmptyExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
