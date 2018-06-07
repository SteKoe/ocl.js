import { LeftRightBasedExpression } from '../Expression'

/**
 * Addition
 *
 * @oclExpression Symbol: +
 * @oclExample 1 + 2
 */
export class AdditionExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitAdditionExpression(this);
    }
}