import { BodyBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export declare class OclIsTypeOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
