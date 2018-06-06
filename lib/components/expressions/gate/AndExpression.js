import { GateExpression } from "./GateExpression";
import { OrExpression } from './OrExpression'

/**
 * @typicalname and
 */
export class AndExpression extends GateExpression {
    visit(visitor) {
        return visitor.visitAndExpression(this);
    }
}
