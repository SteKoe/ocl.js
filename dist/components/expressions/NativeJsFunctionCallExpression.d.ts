import { Expression, SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
export declare class NativeJsFunctionCallExpression extends SourceBasedExpression {
    private fn;
    private params;
    constructor(source: any, fn: any, params: any);
    getFn(): any;
    getParams(): Array<Expression>;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
