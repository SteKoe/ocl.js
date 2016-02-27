import Expression from './expression';

class AttributeCallExpression extends Expression {
    constructor(variable, attribute) {
        super();
        this.variable = variable;
        this.attribute = attribute;
    }

    evaluate(obj, variables) {
        if(this.variable === 'self') {
            return obj[this.attribute];
        }

        return variables[this.variable][this.attribute];
    }
}

export default AttributeCallExpression;
