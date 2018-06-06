import { LiteralExpression } from "./LiteralExpression";

/**
 * @typicalname Number
 */
export class NumberExpression extends LiteralExpression {
    parseValue(value) {
        if (!isNaN(+value)) {
            return +value;
        } else {
            throw new SyntaxError(`NumberExpression: '${value}' is not a Number!`);
        }
    }

    visit(visitor) {
        return visitor.visitLiteralExpression(this);
    }
}
