import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

/**
 * The IfExpression allows to execute a statement if the given condition is truthy.
 * Otherwise the else part is taken.
 */
export class IfExpression extends Expression {
    private readonly condition: any;
    private readonly thenExpression: any;
    private readonly elseExpression: any;

    constructor(condition: Expression, _then: Expression, _else: Expression) {
        super();
        this.condition = condition;
        this.thenExpression = _then;
        this.elseExpression = _else;
    }

    getCondition(): Expression {
        return this.condition;
    }

    getThenExpression(): Expression {
        return this.thenExpression;
    }

    getElseExpression(): Expression {
        return this.elseExpression;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean {
        return this.getCondition().evaluate(visitor, localVariables)
            ? this.getThenExpression().evaluate(visitor, localVariables)
            : this.getElseExpression().evaluate(visitor, localVariables);
    }

}
