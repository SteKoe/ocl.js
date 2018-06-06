import { Expression } from "./Expression";
import { Utils } from "../Utils";

export class OclIsTypeOfExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitOclIsTypeOfExpression(this);
    }
}
