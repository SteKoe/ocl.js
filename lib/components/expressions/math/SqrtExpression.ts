import { BodyBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Sqrt
 *
 * @oclExpression Symbol: sqrt
 */
export class SqrtExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitSqrtExpression(this);
    }
}
