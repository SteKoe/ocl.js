import { OclExecutionContext } from '../OclExecutionContext';
import { LocalVariables } from '../types';
import { Utils } from '../Utils';

import {BodyBasedExpression} from "./BodyBasedExpression";
import {Expression} from "./Expression";

/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        let source = this.getSource().evaluate(visitor, localVariables);
        source = Utils.getClassName(source);

        const bodyExpr = this.getBody();
        let body = Array.isArray(bodyExpr) 
            ? bodyExpr[0]?.evaluate(visitor, localVariables)
            : (bodyExpr as Expression).evaluate(visitor, localVariables);

        if (typeof body !== 'string') {
            body = Utils.getClassName(body);
        }

        return source === body;
    }
}
