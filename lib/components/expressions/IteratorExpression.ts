import {OclExecutionContext} from "../OclExecutionContext";
import {Utils} from "../Utils";

import {BodyBasedExpression} from "./BodyBasedExpression";

export abstract class IteratorExpression extends BodyBasedExpression {
    private iterators: Array<any>;

    setIterators(iterators: Array<any>): void {
        this.iterators = iterators;
    }

    getIterators(): Array<any> {
        return this.iterators;
    }

    protected evaluateBody(visitor: OclExecutionContext, localVariables: any, item: any) {
        const variables = {};
        if (this.getIterators()) {
            variables[this.getIterators()[0]] = item;
        } else {
            const variableName = Utils.getVariableName(this);
            const varName = variableName.getVariable();
            variables[varName] = varName === "self" ? item : (item[varName] ?? item);
        }

        return this.getBody().evaluate(visitor, {...localVariables, ...variables});
    }
}