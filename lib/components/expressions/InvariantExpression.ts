import {OclExecutionContext} from '@/OclExecutionContext';
import {LocalVariables} from '@/types';

import {Expression} from './Expression';
import {deriveNameFromExpression} from './ExpressionNamer';

/**
 * @oclSpecification
 * The OCL expression can be part of an Invariant which is a Constraint stereotyped as an «invariant».
 * When the invariant is associated with a Classifier, the latter is referred to as a "type" in this clause.
 * An OCL expression is an invariant of the type and must be true for all instances of that type at any time.
 * (Note that all OCL expressions that express invariants are of the type Boolean.)
 *
 * @oclExample context Person inv:
 *     self.age > 0
 */
export class InvariantExpression extends Expression {
    private readonly name: string;
    private readonly definition: Expression;

    constructor(oclExpression: Expression, name?: string) {
        super();
        this.name = name ?? deriveNameFromExpression(oclExpression);
        this.definition = oclExpression;
    }

    getName(): string {
        return this.name;
    }

    getDefinition(): Expression {
        return this.definition;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const evaluationResult = this.getDefinition().evaluate(visitor, localVariables);
        visitor.setEvaluatedValue(this, evaluationResult);
        return evaluationResult === true;
    }
}
