import { GateExpression } from "./GateExpression";

/**
 * @typicalname or
 */
export class OrExpression extends GateExpression {
    visit(visitor) {
        return visitor.visitOrExpression(this);
    }
}
