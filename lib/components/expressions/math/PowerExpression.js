import { MathExpression } from "./MathExpression";

/**
 * Modulo
 *
 * @typicalname pow
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return Math.pow(e.left, e.right);
    }
}