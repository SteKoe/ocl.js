import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 * The IfExpression allows to execute a statement if the given condition is truthy.
 * Otherwise the else part is taken.
 */
export declare class IfExpression extends Expression {
    private condition;
    private _then;
    private _else;
    constructor(condition: any, _then: any, _else: any);
    getCondition(): Expression;
    getThenExpression(): Expression;
    getElseExpression(): Expression;
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
