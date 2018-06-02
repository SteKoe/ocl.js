import { Expression } from "./Expression";

export class OclIsUndefinedExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        let result = this.source.evaluate(obj);
        return result === undefined || typeof result === 'undefined';
    }
}
