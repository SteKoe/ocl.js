import {OclExecutionContext} from "@/OclExecutionContext";
import {LocalVariables} from "@/types";
import {Utils} from "@/Utils";

import {BodyBasedExpression} from "./BodyBasedExpression";

export abstract class IteratorExpression extends BodyBasedExpression {
    private iterators!: string[];

    setIterators(iterators: string[]): void {
        this.iterators = iterators;
    }

    getIterators(): string[] {
        return this.iterators;
    }

    /**
     * Evaluate the body expression for a single item in the iteration.
     * Note: This is different from BodyBasedExpression.evaluateBody() which doesn't take an item.
     */
    protected evaluateBodyForItem(visitor: OclExecutionContext, localVariables: LocalVariables | undefined, item: unknown): unknown {
        const variables: LocalVariables = {};
        if (this.getIterators()) {
            variables[this.getIterators()[0]] = item;
        } else {
            const variableName = Utils.getVariableName(this);
            const varName = variableName?.getVariable();
            if (varName) {
                variables[varName] = varName === "self" ? item : ((item as Record<string, unknown>)[varName] ?? item);
            }
        }

        const body = this.getBodyAsExpression();
        if (!body) {
            throw new Error('Iterator body is required');
        }
        return body.evaluate(visitor, {...(localVariables ?? {}), ...variables});
    }
}