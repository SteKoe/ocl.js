import { LeftRightBasedExpression } from '../Expression'

/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export class DivideExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitDivideExpression(this);
    }
}