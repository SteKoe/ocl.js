import { BodyBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression concat(s : String) : String
 * @oclExample self.name->concat("string")
 */
export class ConcatExpression extends BodyBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitConcatExpression(this);
    }
}
