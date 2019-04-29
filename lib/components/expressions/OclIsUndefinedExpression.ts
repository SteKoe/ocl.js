import { SourceBasedExpression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 * Checks if *self* is not defined or  null
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const result = this.getSource()
            .evaluate(visitor, localVariables);

        return !Boolean(result) || typeof result === 'undefined';
    }
}
