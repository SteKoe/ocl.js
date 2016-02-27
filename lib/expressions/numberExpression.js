import Expression from './expression';

class NumberExpression extends Expression {
    constructor(value) {
        super();
        this.value = +value;
    }

    evaluate() {
        return this.value;
    }
}

export default NumberExpression;
