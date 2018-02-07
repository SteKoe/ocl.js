import { Expression } from "./expression";

export class NativeJsFunctionCallExpression extends Expression {
    constructor(source, fn, params) {
        super();
        this.source = source;
        this.fn = fn;

        this.params = params.filter(param => !!param);
    }

    evaluate(obj) {
        let source = this.source.evaluate(obj);
        const params = this.params.map(param => param.evaluate(obj));

        if (!source) {
            return false;
        }

        let fn = source[this.fn];
        let isFunction = typeof fn === 'function';
        return isFunction ? fn.apply(source, params) : false;
    }
}
