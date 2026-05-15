import {InvariantExpression} from '@/expressions/InvariantExpression';
import {DefExpression} from '@/expressions/DefExpression';
import {OclExecutionContext} from '@/OclExecutionContext';
import {LocalVariables} from '@/types';

import {ContextExpression} from './ContextExpression';

/**
 * Define invariants and definitions on a given types
 *
 * @oclExpression context <Type> (inv|def)
 */
export class ClassifierContextExpression extends ContextExpression {
    private readonly invs: Array<InvariantExpression>;
    private readonly defs: Array<DefExpression>;

    constructor(targetType: string, rules: Array<InvariantExpression | DefExpression>) {
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
            const targetTypeName = visitor.getTargetTypeName();
            if (!targetTypeName) {
                return false;
            }
            const visitorTargetType = visitor.getRegisteredType(targetTypeName) ?? targetTypeName;
            const expressionTargetType = visitor.getRegisteredType(this.targetType) ?? this.targetType;

            if (typeof visitorTargetType === 'string' || typeof expressionTargetType === 'string') {
                return this.targetType === targetTypeName;
            } else {
                return visitorTargetType instanceof expressionTargetType || visitorTargetType === expressionTargetType;
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): any {
        super.evaluate(visitor);

        if (this.accept(visitor)) {

            this.getDefs()
                .forEach(def => def.evaluate(visitor));

            const invs = this.getInvs();

            const result = !invs
                .map(inv => {
                    const evaluationResult = inv.evaluate(visitor);
                    if (evaluationResult === false) {
                        visitor.addFailedInvariant(inv);
                    }

                    return evaluationResult;
                })
                .some(inv => inv === false);

            visitor.setEvaluatedValue(this, result);
            visitor.setEvaluationResult(result);
            return result;
        }
    }
}
