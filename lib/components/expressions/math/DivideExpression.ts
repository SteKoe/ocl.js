import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';

/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export class DivideExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return (left as number) / (right as number);
    }
}
