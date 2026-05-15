import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';
import { Expression } from '@/expressions/Expression';

/**
 * Replaces all occurrences of a substring with another string.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::replaceAll(old : String, new : String) : String
 * @oclExample 'hello hello'.replaceAll('hello', 'hi')
 */
export class ReplaceAllExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string {
        const source = this.getSource().evaluate(visitor, localVariables);
        const body = this.getBody();

        if (typeof source !== 'string' || !body) {
            return String(source);
        }

        let oldString: Expression;
        let newString: Expression;
        
        if (Array.isArray(body)) {
            oldString = body[0];
            newString = body[1];
        } else {
            // If only one parameter, return source unchanged
            return String(source);
        }

        const oldValue = oldString.evaluate(visitor, localVariables) as string;
        const newValue = newString.evaluate(visitor, localVariables) as string;

        if (typeof oldValue !== 'string' || typeof newValue !== 'string') {
            return String(source);
        }

        // Replace all occurrences using global replace
        return source.split(oldValue).join(newValue);
    }
}
