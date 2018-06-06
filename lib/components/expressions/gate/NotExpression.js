import { Expression } from "../Expression";

/**
 * @typicalname not
 */
export class NotExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitNotExpression(this);
    }
}
