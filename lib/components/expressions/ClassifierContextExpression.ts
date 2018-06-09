import {InvariantExpression} from "./InvariantExpression";
import {LetExpression} from "./LetExpression";
import {ContextExpression} from './ContextExpression'
import {OclVisitor} from "../OclVisitor";

export class ClassifierContextExpression extends ContextExpression {
    private invs: InvariantExpression[];
    private defs: LetExpression[];

    constructor(targetType, rules: any[]) {
        super();

        if (!(rules instanceof Array)) {
            rules = [rules];
        }

        this.targetType = targetType;
        this.invs = rules.filter(i => i instanceof InvariantExpression);
        this.defs = rules.filter(i => i instanceof LetExpression);
    }

    getInvs() {
        return this.invs;
    }

    getDefs() {
        return this.defs;
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

    visit(visitor: OclVisitor) {
        return visitor.visitClassifierContextExpression(this);
    }
}
