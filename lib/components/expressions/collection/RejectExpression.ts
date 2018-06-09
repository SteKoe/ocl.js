import {IteratorExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns a collection with all elements except for those who the given oclExpression validates to true.
 *
 * @oclExpression reject(expr : oclExpression) : Collection
 * @oclExample self.customer->reject(underage)
 */
export class RejectExpression extends IteratorExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitRejectExpression(this);
    }
}
