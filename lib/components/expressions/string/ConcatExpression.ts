import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression concat(s : String) : String
 * @oclExample self.name->concat("string")
 */
export class ConcatExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);
        const body = this.getBody()
            .evaluate(visitor);

        return String(source)
            .concat(String(body));
    }
}
