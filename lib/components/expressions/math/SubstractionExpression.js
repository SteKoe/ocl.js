import { LeftRightBasedExpression } from '../Expression'

/**
 * Substraction
 *
 * @oclExpression Symbol: -
 * @oclExample 1 - 2
 */
export class SubstractionExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitSubstractionExpression(this)
    }
}