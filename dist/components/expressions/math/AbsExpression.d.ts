import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the absolute value of self.
 *
 * @oclExpression Number::abs () : Number
 * @oclExample -2.abs() = 2
 */
export declare class AbsExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
