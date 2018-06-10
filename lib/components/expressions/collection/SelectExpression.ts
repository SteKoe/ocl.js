import { IteratorExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Selects all elements from collection which fit the expr.
 *
 * @oclExpression select(expr : oclExpression) : Collection
 * @oclExample self.collection->select(item | item.name = "random")
 */
export class SelectExpression extends IteratorExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitSelectExpression(this);
    }
}
