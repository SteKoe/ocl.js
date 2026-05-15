import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';

/**
 * Returns the last index (1-based) of the given substring in self, or 0 if not found.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::lastIndexOf(s : String) : Integer
 * @oclExample 'hello world'.lastIndexOf('o')
 */
export class LastIndexOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const source = this.getSource().evaluate(visitor, localVariables) as string;
        const searchString = this.getBodyAsExpression()?.evaluate(visitor, localVariables) as string;

        if (typeof source !== 'string' || typeof searchString !== 'string') {
            return 0;
        }

        if (searchString.length === 0) {
            return 0;
        }

        const index = source.lastIndexOf(searchString);
        // Convert to 1-based index, return 0 if not found
        return index === -1 ? 0 : index + 1;
    }
}
