import { MathExpression } from "./MathExpression";

/**
 * Modulo
 *
 * @typicalname pow
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitPowerExpression(this);
    }
}