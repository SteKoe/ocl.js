import { MathExpression } from "./MathExpression";

/**
 * Substraction
 *
 * @typicalname substract
 * @oclExample 1 - 2
 */
export class SubstractionExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitSubstractionExpression(this)
    }
}