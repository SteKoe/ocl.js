import { Expression } from "../Expression";

export class AtOperation extends Expression {
    constructor(source, index) {
        super();
        this.source = source;
        this.index = index;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        const index = this.index.evaluate(obj);

        if (source instanceof Array && Number.isInteger(index) && index >= 0 && index < source.length) {
            return source[index];
        }
    }
}
