import { Expression } from "../Expression";

/**
 * Returns a string in lower case
 *
 * @typicalname toLowerCase
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitToLowerCaseExpression(this);
    }
}
