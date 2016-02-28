import Expression from './expression';

class NumberExpression extends Expression {
    constructor(value) {
        super();

        if(!isNaN(+value)) {
            this.value = +value;
        } else {
            throw new SyntaxError(`NumberExpression: '${value}' is not a Number!`);
        }
    }

    evaluate() {
        return this.value;
    }
}

export default NumberExpression;
