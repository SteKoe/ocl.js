import { Expression } from "../Expression";

export class LastOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if (source instanceof Array) {
            return source[source.length - 1];
        }
    }
}
