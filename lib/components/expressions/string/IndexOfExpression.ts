import { BodyBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @oclExpression indexOf(s : String) : Number
 * @oclExample self.name->indexOf("string")
 */
export class IndexOfExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitIndexOfExpression(this);
    }
}
