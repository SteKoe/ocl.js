import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import {BodyBasedExpression} from "../BodyBasedExpression";

/**
 * Returns the square root of *self*.
 *
 * @oclExpression Number::sqrt () : Number
 * @oclExample 9.sqrt() = 3
 */
export class SqrtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const sqrt = (this.getBodyAsExpression()?.evaluate(visitor) ?? 2) as number;
        const left = this.getSource().evaluate(visitor, localVariables) as number;

        return Math.pow(left, 1 / sqrt);
    }
}
