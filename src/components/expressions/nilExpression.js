import {Expression} from './abstractExpression'; 

export class NilExpression extends Expression {
    constructor() {
        super();
    }

    evaluate() {
        return;
    }
}
