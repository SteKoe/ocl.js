import Expression from './expression';

class BooleanExpression extends Expression {
    constructor(value) {
        super();
        this.value = JSON.parse(value);
    }

    evaluate() {
        return this.value;
    }
}

export default BooleanExpression;
