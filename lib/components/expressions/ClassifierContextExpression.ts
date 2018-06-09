import { InvariantExpression } from './InvariantExpression';
import { LetExpression } from './LetExpression';
import { ContextExpression } from './ContextExpression';
import { OclVisitor } from '../OclVisitor';

export class ClassifierContextExpression extends ContextExpression {
    private invs: Array<InvariantExpression>;
    private defs: Array<LetExpression>;

    constructor(targetType, rules: Array<any>) {
        super();

        if (!(rules instanceof Array)) {
            rules = [rules];
        }

        this.targetType = targetType;
        this.invs = rules.filter(i => i instanceof InvariantExpression);
        this.defs = rules.filter(i => i instanceof LetExpression);
    }

    getInvs(): Array<InvariantExpression> {
        return this.invs;
    }

    getDefs(): Array<LetExpression> {
        return this.defs;
    }

    accept(visitor): boolean {
        const accept = super.accept(visitor);

        if (accept === false) {
            return false;
        } else {
            const visitorTargetType = visitor.registeredTypes[visitor.targetType] || visitor.targetType;
            const expressionTargetType = visitor.registeredTypes[this.targetType] || this.targetType;

            if (typeof visitorTargetType === 'string' || typeof expressionTargetType === 'string') {
                return this.targetType === visitor.targetType;
            } else {
                return visitorTargetType instanceof expressionTargetType || visitorTargetType === expressionTargetType;
            }
        }

        return accept;
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitClassifierContextExpression(this);
    }
}
