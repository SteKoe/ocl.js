import { MathExpression } from "./MathExpression";

/**
 * Substraction
 *
 * @typicalname substract
 * @oclExample 1 - 2
 */
export class SubstractionExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return e.left - e.right;
    }
}