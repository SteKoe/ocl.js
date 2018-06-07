import { SourceBasedExpression } from "../Expression";

/**
 * Returns a string in upper case
 *
 * @oclExpression toUpperCase() : String
 * @oclExample self.name->toUpperCase()
 */
export class ToUpperCaseExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitToUpperCaseExpression(this);
    }
}
