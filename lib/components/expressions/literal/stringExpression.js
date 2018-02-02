import { LiteralExpression } from "./literalExpression";

export class StringExpression extends LiteralExpression {
    parseValue(value) {
        return value.replace(/^\"|\"$/g, '');
    }

    evaluate() {
        return this.value;
    }
}
