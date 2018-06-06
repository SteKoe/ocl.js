import { MathExpression } from "./MathExpression";

/**
 * Multiply
 *
 * @oclExpression Symbol: *
 * @oclExample 1 * 2
 */
export class MultiplyExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitMultiplyExpression(this);
    }
}