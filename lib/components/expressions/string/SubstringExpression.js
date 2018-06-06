import { Expression } from "../Expression";

/**
 * Returns a string in lower case
 *
 * @typicalname substring
 * @oclExample self.name->substring(0,2)
 */
export class SubstringExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitSubstringExpression(this);
    }
}
