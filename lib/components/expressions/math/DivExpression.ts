import { OclExecutionContext } from '../../OclExecutionContext';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the integer quotient of the division of self by *i*.
 *
 * @oclExpression Number::div ( i : Number ) : Number
 * @oclExample 3 div 2 = 1
 */
export class DivExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const {source, body} = this._evaluateBodyAndSource(visitor, localVariables);

        return Math.floor(body / source);
    }
}
