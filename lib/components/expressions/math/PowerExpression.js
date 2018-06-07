import { LeftRightBasedExpression } from '../Expression'

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitPowerExpression(this);
    }
}