import { LeftRightBasedExpression } from '@/expressions/LeftRightBasedExpression';
import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

/**
 * Addition
 *
 * @oclExpression Symbol: +
 * @oclExample 1 + 2
 */
export class AdditionExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return (left as number) + (right as number);
    }
}
