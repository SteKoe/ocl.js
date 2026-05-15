import { OclExecutionContext } from '@/OclExecutionContext';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';
import { LocalVariables } from '@/types';

/**
 * Returns true if self does not contain the given element, false otherwise.
 *
 * This is the inverse of the includes operation.
 *
 * @oclSpecification OCL 2.4 - Section 11.9.3 Collection Operations
 * @oclExpression collection->excludes(object : T) : Boolean
 * @oclExample self.employees->excludes(terminatedEmployee)
 * @oclExample Sequence{1, 2, 3}->excludes(4)
 */
export class ExcludesExpression extends BodyBasedExpression {
    /**
     * Evaluates the excludes operation on a collection.
     *
     * @param visitor The execution context
     * @param localVariables Optional local variables
     * @returns true if the collection does not contain the element, false otherwise
     */
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const element = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (Array.isArray(source)) {
            return !source.includes(element);
        }

        return true;
    }
}
