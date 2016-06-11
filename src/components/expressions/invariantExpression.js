import {Expression} from './abstractExpression'; 

export class InvariantExpression extends Expression {
    constructor(oclExpression, name) {
        super();
        this.definition = oclExpression;
        if (name) {
            this.name = name || '';
        }
    }

    evaluate(obj) {
        this.evaluationResult = this.definition.evaluate(obj);
        return this.evaluationResult;
    }
}
