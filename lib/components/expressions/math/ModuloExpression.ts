import { LeftRightBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Modulo
 *
 * @oclExpression Symbol: mod
 * @oclExample 4 mod 2
 */
export class ModuloExpression extends LeftRightBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const {left, right} = this._visitLeftRightExpression(visitor);

        return left % right;
    }
}
