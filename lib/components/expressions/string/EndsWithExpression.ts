import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';

/**
 * Tests whether the string ends with the given suffix.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::endsWith(suffix : String) : Boolean
 * @oclExample 'hello world'.endsWith('world')
 */
export class EndsWithExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const suffix = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (typeof source !== 'string' || typeof suffix !== 'string') {
            return false;
        }

        return source.endsWith(suffix);
    }
}
