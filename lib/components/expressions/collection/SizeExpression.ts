import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns the size of the given collection.
 *
 * @oclExpression size() : Number
 * @oclExample self.collection->size()
 */
export class SizeExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitSizeExpression(this);
    }
}
