import Expression from './expression';

class NilExpression extends Expression {
    constructor() {
        super();
    }

    evaluate() {
        return;
    }
}

export default NilExpression;
