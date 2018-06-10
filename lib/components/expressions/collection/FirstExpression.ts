import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns the first element of the collection.
 *
 * @oclExpression first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitFirstExpression(this);
    }
}
