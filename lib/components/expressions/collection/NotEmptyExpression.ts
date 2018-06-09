import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns true if self is not empty, false otherwise.
 *
 * @oclExpression notEmpty() : Boolean
 * @oclExample self.cars->notEmpty()
 */
export class NotEmptyExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitNotEmptyExpression(this);
    }
}
