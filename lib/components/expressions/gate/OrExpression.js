import { GateExpression } from "./GateExpression";

/**
 * @typicalname or
 */
export class OrExpression extends GateExpression {
    evaluate(obj, variables) {
        const left = this.left.evaluate(obj, variables);
        const right = this.right.evaluate(obj, variables);

        return left || right;
    }
}
