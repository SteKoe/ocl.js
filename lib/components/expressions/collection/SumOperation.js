import { Expression } from "../Expression";

export class SumOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);

        if (source instanceof Array && source instanceof Array) {
            return source.reduce((prev, cur) => prev + cur, 0);
        }

        return 0;
    }
}
