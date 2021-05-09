import { OclExecutionContext } from '../OclExecutionContext';

import { SourceBasedExpression } from './Expression';

/**
 * Checks if *self* is not defined or  null
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const result = this.getSource()
            .evaluate(visitor, localVariables);

        return !result || typeof result === 'undefined';
    }
}
