import { OclExecutionContext } from '../OclExecutionContext';
import { Utils } from '../Utils';


import {BodyBasedExpression} from "./BodyBasedExpression";

/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        let source = this.getSource().evaluate(visitor, localVariables);
        source = Utils.getClassName(source);

        let body = this.getBody().evaluate(visitor, localVariables);

        if (typeof body !== 'string') {
            body = Utils.getClassName(body);
        }

        return source === body;
    }
}
