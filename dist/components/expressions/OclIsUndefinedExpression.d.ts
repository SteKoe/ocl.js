import { SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * Checks if *self* is not defined
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export declare class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
