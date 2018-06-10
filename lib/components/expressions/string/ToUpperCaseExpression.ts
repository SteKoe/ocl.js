import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns a string in upper case
 *
 * @oclExpression toUpperCase() : String
 * @oclExample self.name->toUpperCase()
 */
export class ToUpperCaseExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitToUpperCaseExpression(this);
    }
}
