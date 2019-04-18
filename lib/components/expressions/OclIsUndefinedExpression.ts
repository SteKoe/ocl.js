import { SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 * Checks if *self* is not defined or  null
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const result = this.getSource()
            .evaluate(visitor);

        return !Boolean(result) || typeof result === 'undefined';
    }
}
