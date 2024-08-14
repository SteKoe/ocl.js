import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';
import {SourceBasedExpression} from "./SourceBasedExpression";

export class NativeJsFunctionCallExpression extends SourceBasedExpression {
    private readonly fn: any;
    private readonly params: Array<Expression>;

    constructor(source, fn, params) {
        super(source);
        this.fn = fn;
        this.params = (params || []).filter(param => !!param);
    }

    getFn(): any {
        return this.fn;
    }

    getParams(): Array<Expression> {
        return this.params;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource()
            .evaluate(visitor, localVariables);

        const params = this.getParams()
            .map(param => param.evaluate(visitor, localVariables));

        if (!source) {
            return false;
        }

        const fn = source[this.getFn()];
        const isFunction = typeof fn === 'function';

        if (isFunction) {
            return fn.apply(source, params);
        } else {
            return false;
        }
    }
}
