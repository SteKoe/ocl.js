import {MathExpression} from "./mathExpression";

export class ModuloExpression extends MathExpression {
    evaluate(obj, variables) {
        var e = super.evaluate(obj, variables);
        return e.left % e.right;
    }
}