import { LeftRightBasedExpression } from '../LeftRightBasedExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * | A     | B     | A and B |
 * | ----- | ----- | ------- |
 * | false | false | false   |
 * | false | true  | false   |
 * | true  | false | false   |
 * | true  | true  | true    |
 *
 * @oclExample false and true
 */
export class AndExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        return left && right;
    }
}
