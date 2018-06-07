import { LeftRightBasedExpression } from '../Expression'

/**
 * Sqrt
 *
 * @oclExpression Symbol: sqrt
 */
export class SqrtExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitSqrtExpression(this);
    }
}