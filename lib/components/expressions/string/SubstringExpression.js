import { SourceBasedExpression } from "../Expression";

/**
 * Returns a string in lower case
 *
 * @oclExpression substring(start : Number, end : Number) : String
 * @oclExample self.name->substring(0,2)
 */
export class SubstringExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitSubstringExpression(this);
    }
}
