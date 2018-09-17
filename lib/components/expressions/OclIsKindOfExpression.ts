import {BodyBasedExpression} from './Expression';
import {OclExecutionContext} from '../OclExecutionContext';

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const source = this.getSource()
            .evaluate(visitor);

        const body = this.getBody() ? this.getBody()
            .evaluate(visitor) : undefined;

        if (!body) {
            return false;
        }

        return source instanceof body;
    }
}
