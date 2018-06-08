import { InvariantExpression } from "./InvariantExpression";
import { LetExpression } from "./LetExpression";
import { ContextExpression } from './ContextExpression'

export class ClassifierContextExpression extends ContextExpression {
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
        let accept = super.accept(visitor);

        if (accept === false) {
            return false;
        } else {
            const visitorTargetType = visitor.registeredTypes[visitor.targetType] || visitor.targetType;
            const expressionTargetType = visitor.registeredTypes[this.targetType] || this.targetType;

            if (typeof visitorTargetType === "string" || typeof expressionTargetType === "string") {
                accept = this.targetType === visitor.targetType;
            } else {
                accept = visitorTargetType instanceof expressionTargetType || visitorTargetType === expressionTargetType;
            }

            return accept;
        }
    }

    visit(visitor) {
        return visitor.visitContextExpression(this);
    }
}
