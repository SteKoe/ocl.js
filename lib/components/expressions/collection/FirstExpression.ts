import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns the first element of the collection.
 *
 * @oclExpression first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitFirstExpression(this);
    }
}
