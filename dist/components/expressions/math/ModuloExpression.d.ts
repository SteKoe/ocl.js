import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the number remainder of the division of self by *i*.
 *
 * @oclExpression Number::mod ( i : Number ) : Number
 * @oclExample 4 mod 2 = 0
 */
export declare class ModuloExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
