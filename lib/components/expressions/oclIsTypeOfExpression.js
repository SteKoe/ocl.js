import { Expression } from "./expression";
import { Utils } from "../utils";

export class OclIsTypeOfExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        return Utils.getClassName(this.source.evaluate(obj)) === this.body.evaluate(obj);
    }
}
