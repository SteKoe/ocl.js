import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * Returns a string in lower case
 *
 * @oclExpression toLowerCase() : String
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseExpression extends SourceBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitToLowerCaseExpression(this);
    }
}
