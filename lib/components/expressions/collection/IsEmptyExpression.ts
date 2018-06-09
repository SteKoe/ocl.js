import { SourceBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
export class IsEmptyExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitIsEmptyExpression(this);
    }
}
