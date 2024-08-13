import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression String:: toReal () : Number
 * @oclExample "3.414".toReal()
 */
export class ToRealExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        return Number.parseFloat(source);
    }
}
