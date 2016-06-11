import {Expression} from './abstractExpression'; 

export class BooleanExpression extends Expression {
    constructor(value) {
        super();
        this.value = JSON.parse(value);
    }

    evaluate() {
        return this.value;
    }
}
