import { BodyBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Returns the square root of *self*.
 *
 * @oclExpression Number::sqrt () : Number
 * @oclExample 9.sqrt() = 3
 */
export class SqrtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const sqrt = this.getBody() ? this.getBody().evaluate(visitor) : 2;
        const left = this.getSource().evaluate(visitor, localVariables);

        return Math.pow(left, 1 / sqrt);
    }
}
