import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';

/**
 * | A     | B     | A xor B |
 * | ----- | ----- | ------- |
 * | false | false | false   |
 * | false | true  | true    |
 * | true  | false | true    |
 * | true  | true  | false   |
 *
 * @oclExample false xor true
 */
export class XorExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return (left || right) && !(left && right);
    }
}
