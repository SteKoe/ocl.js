import { BodyBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export declare class OclIsKindOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
