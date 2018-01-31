import { GateExpression } from "./gateExpression";

export class XorExpression extends GateExpression {
    evaluate(obj, variables) {
        let left = this.left.evaluate(obj, variables);
        let right = this.right.evaluate(obj, variables);

        return !!(left ^ right);
    }
}