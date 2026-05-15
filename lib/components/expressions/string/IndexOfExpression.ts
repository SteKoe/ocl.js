import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @oclExpression String::indexOf (s : String) : Number
 * @oclExample self.name.indexOf("string")
 */
export class IndexOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const source = this.getSource().evaluate(visitor, localVariables) as string;
        const indexOfString = this.getBodyAsExpression()?.evaluate(visitor, localVariables) as string;

        return indexOfString?.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    }
}
