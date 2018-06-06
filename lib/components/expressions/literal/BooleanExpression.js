import { LiteralExpression } from "./LiteralExpression";

/**
 * @typicalname Boolean
 */
export class BooleanExpression extends LiteralExpression {
    parseValue(value) {
        return JSON.parse(value);
    }

    visit(visitor) {
        return visitor.visitLiteralExpression(this);
    }
}
