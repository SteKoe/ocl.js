import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';

/**
 * Returns the character at the specified index (1-based).
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::at(index : Integer) : String
 * @oclExample 'hello'.at(2)
 */
export class StringAtExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables);
        const index = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (typeof source !== 'string' || typeof index !== 'number') {
            return '';
        }

        // OCL uses 1-based indexing
        const char = source.charAt(index - 1);
        return char || '';
    }
}
