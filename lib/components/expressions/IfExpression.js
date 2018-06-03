import { Expression } from "./Expression";

export class IfExpression extends Expression {
    constructor(condition, _then, _else) {
        super();
        this.condition = condition;
        this._then = _then;
        this._else = _else;
    }

    evaluate(obj) {
        return this.condition.evaluate(obj) ? this._then.evaluate(obj) : this._else.evaluate(obj);
    }
}