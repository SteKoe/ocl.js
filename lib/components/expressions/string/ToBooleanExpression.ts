import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { SourceBasedExpression } from '@/expressions/SourceBasedExpression';

/**
 * Converts a string to a boolean value.
 * Returns true for 'true' (case-insensitive), false for 'false' (case-insensitive).
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::toBoolean() : Boolean
 * @oclExample 'true'.toBoolean()
 */
export class ToBooleanExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (typeof source !== 'string') {
            return false;
        }

        const normalized = source.toLowerCase().trim();
        
        if (normalized === 'true') {
            return true;
        }
        
        if (normalized === 'false') {
            return false;
        }

        // OCL spec doesn't define behavior for invalid strings
        // We'll return false as a safe default
        return false;
    }
}
