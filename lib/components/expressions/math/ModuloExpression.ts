import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Modulo
 *
 * @oclExpression Symbol: mod
 * @oclExample 4 mod 2
 */
export class ModuloExpression extends LeftRightBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitModuloExpression(this);
    }
}
