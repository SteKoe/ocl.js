import { MathExpression } from "./MathExpression";

/**
 * Modulo
 *
 * @typicalname mod
 * @oclExample 4 mod 2
 */
export class ModuloExpression extends MathExpression {
    visit(visitor) {
        return visitor.visitModuloExpression(this);
    }
}