import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Division
 *
 * @oclExpression Symbol: /
 * @oclExample 17 / 2
 */
export class DivideExpression extends LeftRightBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitDivideExpression(this);
    }
}
