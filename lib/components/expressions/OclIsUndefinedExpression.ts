import {SourceBasedExpression} from './Expression';
import {OclExecutionContext} from '../OclExecutionContext';

/**
 * Checks if *self* is not defined
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const result = this.getSource()
            .evaluate(visitor);

        return result === undefined || typeof result === 'undefined';
    }
}
