import {LeftRightBasedExpression} from '../Expression'
import {OclVisitor} from "../../OclVisitor";

/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
export class PowerExpression extends LeftRightBasedExpression {
    visit(visitor: OclVisitor) {
        return visitor.visitPowerExpression(this);
    }
}