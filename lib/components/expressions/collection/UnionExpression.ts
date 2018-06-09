import {BodyBasedExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @oclExpression union(c : Collection) : Collection
 * @oclExample self.collection->union(self.anotherCollection)
 */
export class UnionExpression extends BodyBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitUnionExpression(this);
    }
}
