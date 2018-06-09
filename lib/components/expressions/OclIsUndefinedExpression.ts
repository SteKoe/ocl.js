import {SourceBasedExpression} from "./Expression";
import {OclVisitor} from "../OclVisitor";

/**
 * Checks if *self* is not defined
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitOclIsUndefinedExpression(this);
    }
}