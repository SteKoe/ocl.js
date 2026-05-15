import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { Utils } from '@/Utils';

import {BodyBasedExpression} from "./BodyBasedExpression";
import {Expression} from "./Expression";
import {VariableExpression} from "./VariableExpression";

/**
 * Checks if *self* is an instance of exactly the class identified by the name (no inheritance).
 *
 * When a metamodel provider is configured on the engine, this expression
 * delegates type checking to the provider's isTypeOf method, enabling
 * support for type systems that are not based on JavaScript prototype chains.
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const sourceObj = this.getSource().evaluate(visitor, localVariables);

        // Try to get the type name - first try evaluating the body, then fall back
        // to extracting from the expression directly (for when types aren't registered)
        let typeName = this.evaluateTypeName(visitor, localVariables);
        
        // If evaluation didn't yield a type name, try extracting from the expression directly
        if (!typeName) {
            typeName = this.getTypeNameFromBody();
        }
        
        if (!typeName) {
            return false;
        }

        // Use the visitor's isTypeOf which delegates to provider if configured
        return visitor.isTypeOf(sourceObj, typeName);
    }

    /**
     * Evaluate the body expression to get a type name.
     * Returns the type name if the body evaluates to a string or a constructor function.
     */
    private evaluateTypeName(visitor: OclExecutionContext, localVariables?: LocalVariables): string | undefined {
        const bodyExpr = this.getBody();
        const body = Array.isArray(bodyExpr) 
            ? bodyExpr[0]?.evaluate(visitor, localVariables)
            : (bodyExpr as Expression).evaluate(visitor, localVariables);

        if (typeof body === 'string') {
            return body;
        }
        
        // If body is a constructor function, get its class name
        if (body && typeof body === 'function') {
            return Utils.getClassName(body);
        }

        return undefined;
    }

    /**
     * Extract the type name from the body expression without evaluating it.
     * This is used when the type isn't registered as a JS constructor.
     */
    private getTypeNameFromBody(): string | undefined {
        const bodyExpr = this.getBodyAsExpression();
        if (!bodyExpr) {
            return undefined;
        }

        // If the body is a VariableExpression, get the variable name (type name)
        if (bodyExpr instanceof VariableExpression) {
            return bodyExpr.getVariable();
        }

        return undefined;
    }
}
