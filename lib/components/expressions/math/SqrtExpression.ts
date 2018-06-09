import {BodyBasedExpression} from '../Expression'
import {OclVisitor} from "../../OclVisitor";

/**
 * Sqrt
 *
 * @oclExpression Symbol: sqrt
 */
export class SqrtExpression extends BodyBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitSqrtExpression(this);
    }
}