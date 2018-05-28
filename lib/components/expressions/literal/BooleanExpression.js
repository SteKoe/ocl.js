import { LiteralExpression } from "./LiteralExpression";

export class BooleanExpression extends LiteralExpression {
    parseValue(value) {
        return JSON.parse(value);
    }

    evaluate() {
        return this.value;
    }
}
