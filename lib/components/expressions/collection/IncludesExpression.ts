import { OclExecutionContext } from '@/OclExecutionContext';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';
import { LocalVariables } from '@/types';

/**
 * Returns true if self contains the given element, false otherwise.
 *
 * @oclSpecification OCL 2.4 - Section 11.9.3 Collection Operations
 * @oclExpression collection->includes(object : T) : Boolean
 * @oclExample self.employees->includes(manager)
 * @oclExample Sequence{1, 2, 3}->includes(2)
 */
export class IncludesExpression extends BodyBasedExpression {
    /**
     * Evaluates the includes operation on a collection.
     *
     * @param visitor The execution context
     * @param localVariables Optional local variables
     * @returns true if the collection contains the element, false otherwise
     */
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const element = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (Array.isArray(source)) {
            return source.includes(element);
        }

        return false;
    }
}
