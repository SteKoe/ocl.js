import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns *self* into upper case string.
 *
 * @oclExpression String:: toUpperCase () : String
 * @oclExample self.name.toUpperCase()
 */
export declare class ToUpperCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
