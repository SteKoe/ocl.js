import { MathExpression } from "./MathExpression";

/**
 * Addition
 *
 * @oclExpression Symbol: +
 * @oclExample 1 + 2
 */
export class AdditionExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitAdditionExpression(this);
    }
}