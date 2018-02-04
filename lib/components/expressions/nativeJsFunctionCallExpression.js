import { Expression } from "./expression";

export class NativeJsFunctionCallExpression extends Expression {
    constructor(source, fn) {
        super();
        this.source = source;
        this.fn = fn;
    }

    evaluate(obj) {
        let source = this.source.evaluate(obj);

        if (!source) {
            return false;
        }

        let fn = source[this.fn];
        let isFunction = typeof fn === 'function';
        return isFunction ? fn.call(source) : false;
    }
}
