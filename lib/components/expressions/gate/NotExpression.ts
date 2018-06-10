import { SourceBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

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
    visit(visitor: IOclVisitor): any {
        return visitor.visitNotExpression(this);
    }
}
