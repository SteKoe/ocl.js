import { MathExpression } from "./MathExpression";

export class AdditionExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return e.left + e.right;
    }
}