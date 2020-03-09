import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

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
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return (left || right) && !(left && right);
    }
}
