import { OclExecutionContext } from '../OclExecutionContext';
import { Expression, SourceBasedExpression } from './Expression';
export declare class NativeJsFunctionCallExpression extends SourceBasedExpression {
    private readonly fn;
    private readonly params;
    constructor(source: any, fn: any, params: any);
    getFn(): any;
    getParams(): Array<Expression>;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
