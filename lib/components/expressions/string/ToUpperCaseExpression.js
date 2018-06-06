import { Expression } from "../Expression";

/**
 * Returns a string in upper case
 *
 * @typicalname toUpperCase
 * @oclExample self.name->toUpperCase()
 */
export class ToUpperCaseExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitToUpperCaseExpression(this);
    }
}
