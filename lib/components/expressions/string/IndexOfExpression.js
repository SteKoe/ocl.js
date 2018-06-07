import { SourceBasedExpression } from "../Expression";

/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @oclExpression indexOf(s : String) : Number
 * @oclExample self.name->indexOf("string")
 */
export class IndexOfExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitIndexOfExpression(this);
    }
}
