import {SourceBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
export class AsSetExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitAsSetExpression(this);
    }
}