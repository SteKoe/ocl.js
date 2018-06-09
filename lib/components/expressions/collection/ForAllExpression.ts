import {IteratorExpression} from "../Expression";
import {OclVisitor} from "../../OclVisitor";

/**
 */
export class ForAllExpression extends IteratorExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitIteratorExpression(this);
    }
}
