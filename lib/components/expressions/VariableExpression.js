import { Expression } from "./Expression";

/**
 */
export class VariableExpression extends Expression {
    constructor(variable) {
        super();
        this.variable = variable;
    }

    _resolvePath(object, reference) {
        return reference.split('.').reduce(dot_deref, object);


        function dot_deref(o, ref) {
            if (!o) return;
            return !ref ? o : ref.split('[').reduce(arr_deref, o);
        }

        function arr_deref(o, ref, i) {
            if (!o) return;

            if (!ref) {
                return o;
            } else {
                let prop = ref.slice(0, i ? -1 : ref.length)

                if (Array.isArray(o)) {
                    return o.map(c => c[prop]);
                }

                return o[prop];
            }
        }
    };

    visit(visitor) {
        return visitor.visitVariableExpression(this);
    }
}
