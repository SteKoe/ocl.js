import { LeftRightBasedExpression } from '../Expression'

/**
 * Multiply
 *
 * @oclExpression Symbol: *
 * @oclExample 1 * 2
 */
export class MultiplyExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitMultiplyExpression(this);
    }
}