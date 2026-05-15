import { OclExecutionContext } from '../OclExecutionContext';
import { LocalVariables } from '../types';

import {BodyBasedExpression} from "./BodyBasedExpression";
import {Expression} from "./Expression";

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);
        const bodyExpr = this.getBody();
        const body = bodyExpr 
            ? (Array.isArray(bodyExpr) 
                ? bodyExpr[0]?.evaluate(visitor, localVariables) 
                : (bodyExpr as Expression).evaluate(visitor, localVariables))
            : undefined;

        if (!body) {
            return false;
        }

        return source instanceof (body as new (...args: unknown[]) => unknown);
    }
}
