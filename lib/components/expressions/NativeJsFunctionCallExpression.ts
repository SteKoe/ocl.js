import {SourceBasedExpression} from "./Expression";
import {OclVisitor} from "../OclVisitor";

export class NativeJsFunctionCallExpression extends SourceBasedExpression {
    private fn: any;
    private params: any[];

    constructor(source, fn, params) {
        super(source);
        this.fn = fn;
        this.params = (params || []).filter(param => !!param);
    }

    getFn() {
        return this.fn;
    }

    getParams() {
        return this.params;
    }

    visit(visitor: OclVisitor) {
        return visitor.visitNativeJsFunctionCallExpression(this);
    }

}
