import { BodyBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
export class AtExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitAtExpression(this);
    }
}
