import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';

/**
 * Tests whether the string starts with the given prefix.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::startsWith(prefix : String) : Boolean
 * @oclExample 'hello world'.startsWith('hello')
 */
export class StartsWithExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const prefix = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (typeof source !== 'string' || typeof prefix !== 'string') {
            return false;
        }

        return source.startsWith(prefix);
    }
}
