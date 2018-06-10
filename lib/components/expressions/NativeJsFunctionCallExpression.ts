import { SourceBasedExpression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

export class NativeJsFunctionCallExpression extends SourceBasedExpression {
    private fn: any;
    private params: Array<any>;

    constructor(source, fn, params) {
        super(source);
        this.fn = fn;
        this.params = (params || []).filter(param => !!param);
    }

    getFn(): any {
        return this.fn;
    }

    getParams(): Array<any> {
        return this.params;
    }

    visit(visitor: IOclVisitor): any {
        return visitor.visitNativeJsFunctionCallExpression(this);
    }

}
