import {BodyBasedExpression} from "./Expression";
import {OclVisitor} from "../OclVisitor";

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends BodyBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitOclIsKindOfExpression(this);
    }
}
