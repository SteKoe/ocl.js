import { Expression } from "../Expression";

/**
 * Returns a string that is concatenated using source and body
 *
 * @typicalname concat
 * @oclExample self.name->concat("string")
 */
export class ConcatExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitConcatExpression(this);
    }
}
