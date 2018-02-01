import {Expression} from "./expression";

export class VariableExpression extends Expression {
    constructor(variable) {
        super();
        this.variable = variable;
    }

    evaluate(obj, variables) {
        let o;
        let parts = this.variable.split('.');
        if (parts[0] === 'self') {
            parts.shift();
            o = obj;
        } else {
            o = variables;
        }

        o = this._resolvePath(o, parts.join('.'));

        return o;
    }

    _resolvePath(object, reference) {
        return reference.split('.').reduce(dot_deref, object);


        function dot_deref(o, ref) {
            if (!o) return;
            return !ref ? o : ref.split('[').reduce(arr_deref, o);
        }

        function arr_deref(o, ref, i) {
            if (!o) return;
            return !ref ? o : (o[ref.slice(0, i ? -1 : ref.length)]);
        }
    };
}
