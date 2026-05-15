import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns *self* as lower case string.
 *
 * @oclExpression String:: toLowerCase () : String
 * @oclExample self.name.toLowerCase()
 */
export class ToLowerCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables);

        return String(source).toLowerCase();
    }
}
