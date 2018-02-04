import { Expression } from "./expression";

export class NativeJsFunctionCallExpression extends Expression {
    constructor(source, fn) {
        super();
        this.source = source;
        this.fn = fn;
    }

    evaluate(obj) {
        let source = this.source.evaluate(obj);

        let fn = source[this.fn];
        let isFunction = typeof fn === 'function';
        let result = fn.call(source)

        return isFunction ? result : false;
    }
}
