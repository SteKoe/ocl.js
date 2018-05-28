import { LiteralExpression } from "./LiteralExpression";

export class StringExpression extends LiteralExpression {
    parseValue(value) {
        return value.replace(/^\"|\"$/g, '');
    }

    evaluate() {
        return this.value;
    }
}
