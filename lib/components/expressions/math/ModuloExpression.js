import { LeftRightBasedExpression } from '../Expression'

/**
 * Modulo
 *
 * @oclExpression Symbol: mod
 * @oclExample 4 mod 2
 */
export class ModuloExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitModuloExpression(this);
    }
}