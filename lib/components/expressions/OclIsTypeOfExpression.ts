import {BodyBasedExpression} from './Expression';
import {OclExecutionContext} from '../OclExecutionContext';
import {Utils} from '../Utils';

/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        let source = this.getSource()
            .evaluate(visitor);
        source = Utils.getClassName(source);

        let body = this.getBody()
            .evaluate(visitor);

        if (typeof body !== 'string') {
            body = Utils.getClassName(body);
        }

        return source === body;
    }
}
