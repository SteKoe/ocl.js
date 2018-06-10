import { LeftRightBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Modulo
 *
 * @oclExpression Symbol: mod
 * @oclExample 4 mod 2
 */
export class ModuloExpression extends LeftRightBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitModuloExpression(this);
    }
}
