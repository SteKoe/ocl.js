import { SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * Checks if *self* is not defined or  null
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export declare class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
