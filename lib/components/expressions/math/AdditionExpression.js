import { MathExpression } from "./MathExpression";

/**
 * Addition
 *
 * @typicalname addition
 * @oclExample 1 + 2
 */
export class AdditionExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return e.left + e.right;
    }
}