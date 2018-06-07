import { MathExpression } from "./MathExpression";

/**
 * Abs
 *
 * @oclExpression Symbol: abs
 */
export class AbsExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitAbsExpression(this);
    }
}