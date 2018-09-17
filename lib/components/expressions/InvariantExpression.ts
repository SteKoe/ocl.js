import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 * @oclSpecification
 * The OCL expression can be part of an Invariant which is a Constraint stereotyped as an «invariant».
 * When the invariant is associated with a Classifier, the latter is referred to as a “type” in this clause.
 * An OCL expression is an invariant of the type and must be true for all instances of that type at any time.
 * (Note that all OCL expressions that express invariants are of the type Boolean.)
 *
 * @oclExample context Person inv:
 *     self.age > 0
 */
export class InvariantExpression extends Expression {
    private name: string;
    private definition: Expression;

    constructor(oclExpression, name) {
        super();
        this.name = name || 'anonymous';
        this.definition = oclExpression;
    }

    getName(): string {
        return this.name;
    }

    getDefinition(): any {
        return this.definition;
    }

    evaluate(visitor: OclExecutionContext): any {
        return this.getDefinition()
            .evaluate(visitor);
    }
}
