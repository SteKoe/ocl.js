import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
export declare abstract class LeftRightBasedExpression extends Expression {
    private readonly left;
    private readonly right;
    constructor(left: any, right: any);
    getLeft(): Expression;
    getRight(): Expression;
    _evaluateLeftRightExpression(visitor: OclExecutionContext, localVariables?: any): {
        left: any;
        right: any;
    };
}
