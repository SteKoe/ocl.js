import { MathExpression } from "./MathExpression";

/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export class DivideExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitDivideExpression(this);
    }
}