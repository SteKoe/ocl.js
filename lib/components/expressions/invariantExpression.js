import { Expression } from "./expression";

export class InvariantExpression extends Expression {
    constructor(oclExpression, name) {
        super();
        this.definition = oclExpression;
        this.name = name || 'anonymous';
    }

    evaluate(obj) {
        this.evaluationResult = this.definition.evaluate(obj);
        return this.evaluationResult;
    }
}
