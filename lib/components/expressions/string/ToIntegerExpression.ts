import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toInteger() : Number
 * @oclExample "3.414"->toInteger()
 */
export class ToIntegerExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitToIntegerExpression(this);
    }
}
