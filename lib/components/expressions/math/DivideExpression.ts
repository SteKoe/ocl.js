import { LeftRightBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export class DivideExpression extends LeftRightBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitDivideExpression(this);
    }
}
