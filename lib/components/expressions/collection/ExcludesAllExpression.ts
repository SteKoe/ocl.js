import { OclExecutionContext } from '@/OclExecutionContext';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';
import { LocalVariables } from '@/types';

/**
 * Returns true if self does not contain any elements from the given collection, false otherwise.
 *
 * This operation checks if the source collection and the provided collection are disjoint
 * (have no common elements). It returns true if none of the elements in the provided
 * collection exist in the source collection.
 *
 * This is the inverse of the includesAll operation - it checks that the collections
 * have no overlap.
 *
 * @oclSpecification OCL 2.4 - Section 11.9.3 Collection Operations
 * @oclExpression collection->excludesAll(c : Collection(T)) : Boolean
 * @oclExample self.activeEmployees->excludesAll(self.terminatedEmployees)
 * @oclExample Sequence{1, 2, 3}->excludesAll(Sequence{4, 5, 6})
 */
export class ExcludesAllExpression extends BodyBasedExpression {
    /**
     * Evaluates the excludesAll operation on a collection.
     *
     * @param visitor The execution context
     * @param localVariables Optional local variables
     * @returns true if the collection excludes all elements from the provided collection, false otherwise
     */
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const collection = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (Array.isArray(source) && Array.isArray(collection)) {
            return collection.every(element => !source.includes(element));
        }

        return true;
    }
}
