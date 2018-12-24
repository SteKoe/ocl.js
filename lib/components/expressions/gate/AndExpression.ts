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
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return left && right;
    }
}
