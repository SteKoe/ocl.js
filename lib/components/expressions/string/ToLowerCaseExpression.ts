import { SourceBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * Returns a string in lower case
 *
 * @oclExpression toLowerCase() : String
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitToLowerCaseExpression(this);
    }
}
