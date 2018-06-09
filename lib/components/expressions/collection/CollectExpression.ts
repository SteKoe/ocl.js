import { IteratorExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Returns a collection having the same size as the original one.
 * The given oclExpression is applied on all elements of the collection.
 *
 * @oclExpression collect(expr : OclExpression) : Collection
 * @oclExample self.children->collect(age)
 */
export class CollectExpression extends IteratorExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitCollectExpression(this);
    }
}
