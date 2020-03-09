import { OclExecutionContext } from '../OclExecutionContext';

import { BodyBasedExpression } from './Expression';

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource().evaluate(visitor, localVariables);
        const body = this.getBody() ? this.getBody().evaluate(visitor, localVariables) : undefined;

        if (!body) {
            return false;
        }

        return source instanceof body;
    }
}
