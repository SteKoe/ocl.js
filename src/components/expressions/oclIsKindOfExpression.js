import {Expression} from './abstractExpression'; 

export class OclIsKindOfExpression extends Expression {
    constructor(source, value) {
        super();
        this.source = source;
        this.value = value;
    }

    evaluate() {
        return this.source instanceof this.value;
    }
}
