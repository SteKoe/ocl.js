import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { SourceBasedExpression } from '@/expressions/SourceBasedExpression';

/**
 * Returns a sequence of characters representing the string.
 *
 * @oclSpecification OCL 2.4 - Section 11.2.3 String Operations
 * @oclExpression String::characters() : Sequence(String)
 * @oclExample 'hello'.characters()
 */
export class CharactersExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): string[] {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (typeof source !== 'string') {
            return [];
        }

        return source.split('');
    }
}
