import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

/**
 * @oclSpecification
 * The Let expression allows a variable to be used in one OCL expression.
 * To enable reuse of variables/operations over multiple OCL expressions one can use a Constraint with the stereotype «definition», in which helper variables/operations are defined.
 * This «definition» Constraint must be attached to a Classifier and may only contain variable and/or operation definitions, nothing else.
 * All variables and operations defined in the «definition» constraint are known in the same context as where any property of the Classifier can be used.
 * Such variables and operations are attributes and operations with stereotype «OclHelper» of the classifier.
 * They are used in an OCL expression in exactly the same way as normal attributes or operations are used.
 * The syntax of the attribute or operation definitions is similar to the Let expression, but each attribute and operation definition is prefixed with the keyword ‘def’ as shown below.
 *
 * @oclExample context Person def:
 *     income : Integer = self.job.salary->sum()
 */
export class DefExpression extends Expression {
    private readonly key: string;
    private readonly value: Expression;

    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }

    getKey(): string {
        return this.key;
    }

    getValue(): Expression {
        return this.value;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        visitor.getObjectToEvaluate()[this.getKey()] = this.getValue()
            .evaluate(visitor, localVariables);
    }
}
