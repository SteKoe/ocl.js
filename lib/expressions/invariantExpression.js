import Expression from './expression';

class InvariantExpression extends Expression {
    constructor(oclExpression, name) {
        super();
        this.definition = oclExpression;
        if(name) {
            this.name = name || '';
        }
    }

    evaluate(obj) {
        return this.definition.evaluate(obj);
    }
}

export default InvariantExpression;
