import {OclExecutionContext} from "../OclExecutionContext";
import {Expression} from "./Expression";
import {SourceBasedExpression} from "./SourceBasedExpression";

export abstract class BodyBasedExpression extends SourceBasedExpression {
    private body: Expression;

    setBody(body: Expression): any {
        this.body = body;
    }

    getBody(): Expression {
        return this.body;
    }

    _evaluateBodyAndSource(visitor: OclExecutionContext, localVariables?: any): { source: any, body: any } {
        const body = this.getSource()
            .evaluate(visitor, localVariables);

        const source = this.getBody()
            .evaluate(visitor, localVariables);

        return {source, body};
    }
}