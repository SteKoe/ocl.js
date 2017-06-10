import {Expression} from "../expression";

export class UnionOperation extends Expression {
    constructor(source, body) {
        super();
        this.source = source;
        this.body = body;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        const body = this.body.evaluate(obj);

        if(source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }
        return [];
    }
}
