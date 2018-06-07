import { SourceBasedExpression } from "../Expression";

/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression concat(s : String) : String
 * @oclExample self.name->concat("string")
 */
export class ConcatExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitConcatExpression(this);
    }
}
