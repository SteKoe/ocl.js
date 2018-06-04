import { MathExpression } from "./MathExpression";

/**
 * Multiply
 *
 * @typicalname multiply
 * @oclExample 1 * 2
 */
export class MultiplyExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return e.left * e.right;
    }
}