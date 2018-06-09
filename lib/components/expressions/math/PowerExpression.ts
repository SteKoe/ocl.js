import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends LeftRightBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitPowerExpression(this);
    }
}
