import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
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
export declare class InvariantExpression extends Expression {
    private readonly name;
    private readonly definition;
    constructor(oclExpression: any, name: any);
    getName(): string;
    getDefinition(): any;
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
