import { LiteralExpression } from "./LiteralExpression";

/**
 * @typicalname Boolean
 */
export class BooleanExpression extends LiteralExpression {
    parseValue(value) {
        return JSON.parse(value);
    }

    evaluate() {
        return this.value;
    }
}
