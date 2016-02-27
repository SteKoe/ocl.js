import Expression from './expression';

class InvariantExpression extends Expression {
    constructor(definition) {
        super();
        this.definition = definition;
    }

    evaluate(obj) {
        return this.definition.evaluate(obj);
    }
}

export default InvariantExpression;
