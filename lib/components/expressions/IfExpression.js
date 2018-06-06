import { Expression } from "./Expression";

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