import { LeftRightBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 */
export class DivExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return Math.floor(left / right);
    }
}
