import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toReal() : Number
 * @oclExample "3.414"->toReal()
 */
export class ToRealExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitToRealExpression(this);
    }
}
