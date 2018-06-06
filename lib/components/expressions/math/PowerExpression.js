import { MathExpression } from "./MathExpression";

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitPowerExpression(this);
    }
}