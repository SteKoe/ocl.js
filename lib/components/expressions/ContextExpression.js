import { Expression } from "./Expression";
import { InvariantExpression } from "./InvariantExpression";
import { LetExpression } from "./LetExpression";
import { Utils } from "../Utils";;

export class ContextExpression extends Expression {
    constructor(targetType, rules) {
        super();

        if (!(rules instanceof Array)) {
            rules = [rules];
        }

        this.targetType = targetType;
        this.invs = rules.filter(i => i instanceof InvariantExpression);
        this.defs = rules.filter(i => i instanceof LetExpression);
    }

    evaluate(obj) {
        obj = obj || {};

        if (this.targetType === this._getClassName(obj)) {
            this.defs.forEach(def => def.evaluate(obj));
            this.evaluationResult = !this.invs.some(i => i.evaluate(obj) === false);
            return this.evaluationResult;
        }

        return false;
    }

    _getClassName(obj) {
        return Utils.getClassName(obj);
    }
}
