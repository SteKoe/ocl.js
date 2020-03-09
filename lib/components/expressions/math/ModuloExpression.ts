import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the number remainder of the division of self by *i*.
 *
 * @oclExpression Number::mod ( i : Number ) : Number
 * @oclExample 4 mod 2 = 0
 */
export class ModuloExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return left % right;
    }
}
