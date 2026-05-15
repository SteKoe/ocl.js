import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { SourceBasedExpression } from '@/expressions/SourceBasedExpression';

/**
 * Returns a string with leading and trailing whitespace removed.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::trim() : String
 * @oclExample '  hello world  '.trim()
 */
export class TrimExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (typeof source !== 'string') {
            return String(source);
        }

        return source.trim();
    }
}
