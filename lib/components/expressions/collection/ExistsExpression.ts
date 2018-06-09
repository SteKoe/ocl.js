import { IteratorExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Operation which checks whether a collection contains an element specified by expr.
 *
 * @oclExpression exists(expr : OclExpression) : Boolean
 * @oclExample self.collection->exists(i | i < 2)
 */
export class ExistsExpression extends IteratorExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitExistsExpression(this);
    }
}
