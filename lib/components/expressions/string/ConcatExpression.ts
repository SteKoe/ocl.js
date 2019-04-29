import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression String::concat (s : String) : String
 * @oclExample self.name.concat("string")
 */
export class ConcatExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);
        const body = this.getBody().evaluate(visitor, localVariables);

        return String(source).concat(String(body));
    }
}
