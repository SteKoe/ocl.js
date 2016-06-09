import Expression from './expression';

class StringExpression extends Expression {
    constructor(value) {
        super();
        this.value = value.replace(/^\"|\"$/g, '');
    }

    evaluate() {
        return this.value;
    }
}

export default StringExpression;
