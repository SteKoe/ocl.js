import { OclExecutionContext } from '../OclExecutionContext';
import { SourceBasedExpression } from './Expression';
/**
 * Checks if *self* is not defined or  null
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export declare class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
