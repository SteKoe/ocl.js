import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression String::concat (s : String) : String
 * @oclExample self.name.concat("string")
 */
export class ConcatExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables);
        const body = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        return String(source).concat(String(body));
    }
}
