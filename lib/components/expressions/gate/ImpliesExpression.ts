import {LeftRightBasedExpression} from '../LeftRightBasedExpression';
import {OclExecutionContext} from '../../OclExecutionContext';

/**
 * | A     | B     | A implies B |
 * | ----- | ----- | ----------- |
 * | false | false | true        |
 * | false | true  | true        |
 * | true  | false | false       |
 * | true  | true  | true        |
 *
 * @oclExample false implies true
 */
export class ImpliesExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        if (left) {
            visitor.setEvaluatedValue(this, right);
            return right;
        } else {
            visitor.setEvaluatedValue(this, true);
            return true;
        }
    }
}
