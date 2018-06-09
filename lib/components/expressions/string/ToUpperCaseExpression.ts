import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns a string in upper case
 *
 * @oclExpression toUpperCase() : String
 * @oclExample self.name->toUpperCase()
 */
export class ToUpperCaseExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitToUpperCaseExpression(this);
    }
}
