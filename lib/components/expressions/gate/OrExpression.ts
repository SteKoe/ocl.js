import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';
import { LocalVariables } from '../../types';

/**
 * | A     | B     | A or B |
 * | ----- | ----- | ------ |
 * | false | false | false  |
 * | false | true  | true   |
 * | true  | false | true   |
 * | true  | true  | true   |
 *
 * @oclExample false or true
 */
export class OrExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return left || right;
    }
}
