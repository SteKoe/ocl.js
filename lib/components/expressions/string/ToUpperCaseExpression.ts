import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns *self* into upper case string.
 *
 * @oclExpression String:: toUpperCase () : String
 * @oclExample self.name.toUpperCase()
 */
export class ToUpperCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        return String(source).toUpperCase();
    }
}
