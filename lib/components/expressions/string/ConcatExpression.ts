import { BodyBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression concat(s : String) : String
 * @oclExample self.name->concat("string")
 */
export class ConcatExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitConcatExpression(this);
    }
}
