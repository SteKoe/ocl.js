import { Expression } from "./Expression";

/**
 * The IfExpression allows to execute a statement if the given condition is truthy.
 * Otherwise the else part is taken.
 */
export class IfExpression extends Expression {
    constructor(condition, _then, _else) {
        super();
        this.condition = condition;
        this._then = _then;
        this._else = _else;
    }

    visit(visitor) {
        return visitor.visitIfExpression(this);
    }
}