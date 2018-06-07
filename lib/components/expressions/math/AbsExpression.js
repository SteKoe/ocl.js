import { LeftRightBasedExpression } from '../Expression'

/**
 * Abs
 *
 * @oclExpression Symbol: abs
 */
export class AbsExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitAbsExpression(this);
    }
}