import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns the last element of the collection.
 *
 * @oclExpression last() : T
 * @oclExample self.collection->last()
 */
export class LastExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitLastExpression(this);
    }
}
