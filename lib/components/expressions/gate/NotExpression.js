import { SourceBasedExpression } from "../Expression";

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
    visit(visitor) {
        return visitor.visitNotExpression(this);
    }
}
