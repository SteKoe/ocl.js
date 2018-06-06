import { MathExpression } from "./MathExpression";

/**
 * Addition
 *
 * @typicalname addition
 * @oclExample 1 + 2
 */
export class AdditionExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitAdditionExpression(this);
    }
}