import { Expression } from "./Expression";

export class NativeJsFunctionCallExpression extends Expression {
    constructor(source, fn, params) {
        super();
        this.source = source;
        this.fn = fn;

        this.params = (params || []).filter(param => !!param);
    }

    visit(visitor) {
        return visitor.visitNativeJsFunctionCallExpression(this);
    }
}
