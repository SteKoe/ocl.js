import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';

/**
 * Performs a case-insensitive comparison between two strings.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::equalsIgnoreCase(s : String) : Boolean
 * @oclExample self.name.equalsIgnoreCase('JOHN')
 */
export class EqualsIgnoreCaseExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const compareString = this.getBodyAsExpression()?.evaluate(visitor, localVariables);

        if (typeof source !== 'string' || typeof compareString !== 'string') {
            return false;
        }

        return source.toLowerCase() === compareString.toLowerCase();
    }
}
