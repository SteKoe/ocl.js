import { LeftRightBasedExpression } from '@/expressions/LeftRightBasedExpression';
import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return Math.pow(left as number, right as number);
    }
}
