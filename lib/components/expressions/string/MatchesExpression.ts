import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';

/**
 * Tests whether the string matches the given regular expression pattern.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::matches(regex : String) : Boolean
 * @oclExample 'hello123'.matches('[a-z]+[0-9]+')
 */
export class MatchesExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const pattern = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (typeof source !== 'string' || typeof pattern !== 'string') {
            return false;
        }

        try {
            const regex = new RegExp(pattern);
            return regex.test(source);
        } catch {
            // Invalid regex pattern
            return false;
        }
    }
}
