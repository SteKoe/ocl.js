import { SourceBasedExpression } from "../Expression";

/**
 * Returns a string in lower case
 *
 * @oclExpression toLowerCase() : String
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitToLowerCaseExpression(this);
    }
}
