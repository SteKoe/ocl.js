import { BodyBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
export class AtExpression extends BodyBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitAtExpression(this);
    }
}
