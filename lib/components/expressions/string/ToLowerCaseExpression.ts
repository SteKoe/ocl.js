import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns *self* as lower case string.
 *
 * @oclExpression String:: toLowerCase () : String
 * @oclExample self.name.toLowerCase()
 */
export class ToLowerCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        return String(source).toLowerCase();
    }
}
