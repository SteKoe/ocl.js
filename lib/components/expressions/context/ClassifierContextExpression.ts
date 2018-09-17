import { InvariantExpression } from '../InvariantExpression';
import { DefExpression } from '../DefExpression';
import { ContextExpression } from './ContextExpression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 * Define invariants and definitions on a given types
 *
 * @oclExpression context <Type> (inv|def)
 */
export class ClassifierContextExpression extends ContextExpression {
    private invs: Array<InvariantExpression>;
    private defs: Array<DefExpression>;

    constructor(targetType, rules: Array<any>) {
        super();

        if (!(rules instanceof Array)) {
            rules = [rules];
        }

        this.targetType = targetType;
        this.invs = rules.filter(i => i instanceof InvariantExpression);
        this.defs = rules.filter(i => i instanceof DefExpression);
    }

    getInvs(): Array<InvariantExpression> {
        return this.invs;
    }

    getDefs(): Array<DefExpression> {
        return this.defs;
    }

    accept(visitor: OclExecutionContext): boolean {
        const accept = super.accept(visitor);

        if (accept === false) {
            return false;
        } else {
            const visitorTargetType = visitor.getRegisteredType(visitor.getTargetTypeName()) || visitor.getTargetTypeName();
            const expressionTargetType = visitor.getRegisteredType(this.targetType) || this.targetType;

            if (typeof visitorTargetType === 'string' || typeof expressionTargetType === 'string') {
                return this.targetType === visitor.getTargetTypeName();
            } else {
                return visitorTargetType instanceof expressionTargetType || visitorTargetType === expressionTargetType;
            }
        }
    }

    evaluate(visitor: OclExecutionContext): any {
        super.evaluate(visitor);

        if (this.accept(visitor)) {

            this.getDefs()
                .forEach(def => def.evaluate(visitor));

            const invs = this.getInvs();

            return !invs
                .map(inv => {
                    const evaluationResult = inv.evaluate(visitor);
                    if (evaluationResult === false) {
                        visitor.addFailedInvariant(inv);
                    }

                    return evaluationResult;
                })
                .some(inv => inv === false);
        }
    }
}
