import { OclExecutionContext } from '../OclExecutionContext';
import { BodyBasedExpression } from './Expression';
/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export declare class OclIsKindOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
