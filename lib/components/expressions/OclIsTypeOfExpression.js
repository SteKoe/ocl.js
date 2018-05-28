import { Expression } from "./Expression";
import { Utils } from "../Utils";;

export class OclIsTypeOfExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        return Utils.getClassName(this.source.evaluate(obj)) === this.body.evaluate(obj);
    }
}
