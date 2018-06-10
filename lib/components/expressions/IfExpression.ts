import { Expression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

/**
 * The IfExpression allows to execute a statement if the given condition is truthy.
 * Otherwise the else part is taken.
 */
export class IfExpression extends Expression {
    private condition: any;
    private _then: any;
    private _else: any;

    constructor(condition, _then, _else) {
        super();
        this.condition = condition;
        this._then = _then;
        this._else = _else;
    }

    getCondition(): Expression {
        return this.condition;
    }

    getThenExpression(): Expression {
        return this._then;
    }

    getElseExpression(): Expression {
        return this._else;
    }

    visit(visitor: IOclVisitor): boolean {
        return visitor.visitIfExpression(this);
    }

}
