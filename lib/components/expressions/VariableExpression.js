import { SourceBasedExpression } from "./Expression";

/**
 */
export class VariableExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitVariableExpression(this);
    }
}
