import { IsEmptyExpression } from "./IsEmptyExpression";

/**
 * Returns true if self contains at least one element, false otherwise.
 *
 * @oclExpression notEmpty() : Boolean
 * @oclExample self.cars->notEmpty()
 */
export class IsNotEmptyExpression extends IsEmptyExpression {
    evaluate(obj, variables) {
        const isEmptyExpression = new IsEmptyExpression(this.source);
        return !isEmptyExpression.evaluate(obj, variables);
    }
}
