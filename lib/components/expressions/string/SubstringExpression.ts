import { BodyBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns a string in lower case
 *
 * @oclExpression substring(start : Number, end : Number) : String
 * @oclExample self.name->substring(0,2)
 */
export class SubstringExpression extends BodyBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitSubstringExpression(this);
    }
}
