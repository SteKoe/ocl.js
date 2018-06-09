import {Expression} from "./Expression";
import {OclVisitor} from "../OclVisitor";

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

    getCondition() {
        return this.condition;
    }

    getThenExpression() {
        return this._then;
    }

    getElseExpression() {
        return this._else;
    }

    visit(visitor: OclVisitor) {
        return visitor.visitIfExpression(this);
    }

}