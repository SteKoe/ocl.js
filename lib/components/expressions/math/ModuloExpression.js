import { MathExpression } from "./MathExpression";

/**
 * Modulo
 *
 * @typicalname modulo
 * @oclExample 4 % 2
 */
export class ModuloExpression extends MathExpression {
    evaluate(obj, variables) {
        const e = super.evaluate(obj, variables);
        return e.left % e.right;
    }
}