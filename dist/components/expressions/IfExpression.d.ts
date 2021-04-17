import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
/**
 * The IfExpression allows to execute a statement if the given condition is truthy.
 * Otherwise the else part is taken.
 */
export declare class IfExpression extends Expression {
    private readonly condition;
    private readonly thenExpression;
    private readonly elseExpression;
    constructor(condition: Expression, _then: Expression, _else: Expression);
    getCondition(): Expression;
    getThenExpression(): Expression;
    getElseExpression(): Expression;
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
