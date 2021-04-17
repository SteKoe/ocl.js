import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the nearest number to self.
 *
 * @oclExpression Number::round () : Number
 * @oclExpression 2.5.round() = 3
 */
export declare class RoundExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
