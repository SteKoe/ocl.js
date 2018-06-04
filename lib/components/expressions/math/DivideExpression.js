import { MathExpression } from "./MathExpression";

/**
 * Division
 *
 * @typicalname division
 * @oclExample 17 / 2
 */
export class DivideExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return e.left / e.right;
    }
}