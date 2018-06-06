import { MathExpression } from "./MathExpression";

/**
 * Multiply
 *
 * @typicalname multiply
 * @oclExample 1 * 2
 */
export class MultiplyExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitMultiplyExpression(this);
    }
}