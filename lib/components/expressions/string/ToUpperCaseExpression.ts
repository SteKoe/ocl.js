import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {SourceBasedExpression} from "@/expressions/SourceBasedExpression";

/**
 * Returns *self* into upper case string.
 *
 * @oclExpression String:: toUpperCase () : String
 * @oclExample self.name.toUpperCase()
 */
export class ToUpperCaseExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables);

        return String(source).toUpperCase();
    }
}
