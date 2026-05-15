import {OclExecutionContext} from "../OclExecutionContext";
import {LocalVariables, SourceBodyResult} from "../types";
import {Expression} from "./Expression";
import {SourceBasedExpression} from "./SourceBasedExpression";

export abstract class BodyBasedExpression extends SourceBasedExpression {
    private body!: Expression | Expression[];

    setBody(body: Expression | Expression[]): void {
        this.body = body;
    }

    getBody(): Expression | Expression[] {
        return this.body;
    }

    /**
     * Get the body as a single Expression (first element if array)
     */
    getBodyAsExpression(): Expression | undefined {
        const body = this.body;
        if (Array.isArray(body)) {
            return body[0];
        }
        return body;
    }

    /**
     * Evaluate the body expression
     */
    evaluateBody(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        const bodyExpr = this.getBodyAsExpression();
        return bodyExpr?.evaluate(visitor, localVariables);
    }

    _evaluateBodyAndSource(visitor: OclExecutionContext, localVariables?: LocalVariables): SourceBodyResult {
        const body = this.getSource()
            .evaluate(visitor, localVariables);

        const bodyExpr = this.getBody();
        const source = Array.isArray(bodyExpr) 
            ? bodyExpr.map(b => b.evaluate(visitor, localVariables))
            : bodyExpr.evaluate(visitor, localVariables);

        return {source, body};
    }
}