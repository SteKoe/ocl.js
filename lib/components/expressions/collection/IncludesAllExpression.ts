import { OclExecutionContext } from '@/OclExecutionContext';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';
import { LocalVariables } from '@/types';

/**
 * Returns true if self contains all elements from the given collection, false otherwise.
 *
 * This operation checks if the source collection is a superset of the provided collection.
 * It returns true if every element in the provided collection exists in the source collection.
 *
 * @oclSpecification OCL 2.4 - Section 11.9.3 Collection Operations
 * @oclExpression collection->includesAll(c : Collection(T)) : Boolean
 * @oclExample self.employees->includesAll(self.managers)
 * @oclExample Sequence{1, 2, 3, 4}->includesAll(Sequence{2, 3})
 */
export class IncludesAllExpression extends BodyBasedExpression {
    /**
     * Evaluates the includesAll operation on a collection.
     *
     * @param visitor The execution context
     * @param localVariables Optional local variables
     * @returns true if the collection contains all elements from the provided collection, false otherwise
     */
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const collection = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (Array.isArray(source) && Array.isArray(collection)) {
            return collection.every(element => source.includes(element));
        }

        return false;
    }
}
