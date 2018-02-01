import {Expression} from "./expression";

export class NilExpression extends Expression {
    constructor() {
        super();
    }

    evaluate() {
        return;
    }
}
