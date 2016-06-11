import {Expression} from './abstractExpression'; 

export class StringExpression extends Expression {
    constructor(value) {
        super();
        this.value = value.replace(/^\"|\"$/g, '');
    }

    evaluate() {
        return this.value;
    }
}
