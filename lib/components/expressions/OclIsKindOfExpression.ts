import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

import {BodyBasedExpression} from "./BodyBasedExpression";
import {Expression} from "./Expression";
import {VariableExpression} from "./VariableExpression";

/**
 * Checks if *self* is an instance of the class identified by the name.
 *
 * When a metamodel provider is configured on the engine, this expression
 * delegates type checking to the provider's isKindOf method, enabling
 * support for type hierarchies that are not based on JavaScript prototype chains.
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends BodyBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const source = this.getSource().evaluate(visitor, localVariables);

        // If a metamodel provider is configured, extract the type name directly from the expression
        // without evaluating it (since the type may not be registered as a JS constructor)
        if (visitor.hasMetamodelProvider()) {
            const typeName = this.getTypeNameFromBody();
            if (!typeName) {
                return false;
            }
            return visitor.isKindOf(source, typeName);
        }

        // Without a provider, evaluate the body to get a constructor function for instanceof
        const bodyExpr = this.getBody();
        const body = bodyExpr 
            ? (Array.isArray(bodyExpr) 
                ? bodyExpr[0]?.evaluate(visitor, localVariables) 
                : (bodyExpr as Expression).evaluate(visitor, localVariables))
            : undefined;

        if (!body) {
            return false;
        }

        // Fallback to JavaScript instanceof check
        return source instanceof (body as new (...args: unknown[]) => unknown);
    }

    /**
     * Extract the type name from the body expression without evaluating it.
     * This is used when a metamodel provider is configured, where the type
     * may not be registered as a JS constructor.
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

        // For other expression types, we can't extract a type name
        // This could be extended to support other patterns if needed
        return undefined;
    }
}
