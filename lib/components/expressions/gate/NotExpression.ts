import { SourceBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

/**
 * =====    =====
 * A        NOT A
 * =====    =====
 * true     false
 * false    true
 * =====    =====
 *
 * @oclExample not false
 */
export class NotExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor): any {
        return visitor.visitNotExpression(this);
    }
}
