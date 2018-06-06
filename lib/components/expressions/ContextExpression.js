import { Expression } from "./Expression";
import { InvariantExpression } from "./InvariantExpression";
import { LetExpression } from "./LetExpression";
import { Utils } from "../Utils";

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

    accept(visitor) {
        return this.targetType === visitor.targetType;
    }

    visit(visitor) {
        return visitor.visitContextExpression(this);
    }
}
