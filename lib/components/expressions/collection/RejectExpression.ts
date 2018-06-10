import { IteratorExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns a collection with all elements except for those who the given oclExpression validates to true.
 *
 * @oclExpression reject(expr : oclExpression) : Collection
 * @oclExample self.customer->reject(underage)
 */
export class RejectExpression extends IteratorExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitRejectExpression(this);
    }
}
