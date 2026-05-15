import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression String:: toReal () : Number
 * @oclExample "3.414".toReal()
 */
export class ToRealExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const source = this.getSource().evaluate(visitor, localVariables) as string;

        return Number.parseFloat(source);
    }
}
