import { IteratorExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns a collection having the same size as the original one.
 * The given oclExpression is applied on all elements of the collection.
 *
 * @oclExpression collect(expr : OclExpression) : Collection
 * @oclExample self.children->collect(age)
 */
export class CollectExpression extends IteratorExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitCollectExpression(this);
    }
}
