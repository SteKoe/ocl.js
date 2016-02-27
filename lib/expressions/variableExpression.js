import Expression from './expression';

class VariableExpression extends Expression {
    constructor(variable) {
        super();
        this.variable = variable;
    }

    evaluate(obj) {
        if(this.variable === 'self') {
            return obj;
        }
    }
}

export default VariableExpression;
