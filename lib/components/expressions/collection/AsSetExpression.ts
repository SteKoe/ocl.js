import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
export class AsSetExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitAsSetExpression(this);
    }
}
