import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression String::toInteger () : Number
 * @oclExample "3.414".toInteger()
 */
export class ToIntegerExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        return parseInt(source, 10);
    }
}
