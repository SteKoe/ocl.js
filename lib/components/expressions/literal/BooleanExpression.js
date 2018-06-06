import { LiteralExpression } from "./LiteralExpression";

/**
 */
export class BooleanExpression extends LiteralExpression {
    parseValue(value) {
        return JSON.parse(value);
    }

    visit(visitor) {
        return visitor.visitLiteralExpression(this);
    }
}
