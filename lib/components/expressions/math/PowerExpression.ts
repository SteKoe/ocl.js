import { LeftRightBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends LeftRightBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitPowerExpression(this);
    }
}
