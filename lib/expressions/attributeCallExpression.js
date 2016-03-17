import Expression from './expression';

class AttributeCallExpression extends Expression {
    constructor(variable, attribute) {
        super();
        this.variable = variable;
        this.attribute = attribute;
    }

    evaluate(obj, variables) {
        let context;

        if(this.variable === 'self') {
            context = obj;
        } else {
            context = variables[this.variable];
        }

        return this._attributeValue(context, this.attribute.slice());
    }

    _attributeValue(self, attributes) {
        let obj = self;
        if(obj) {
            obj = obj[attributes.shift()];

            if(attributes.length > 0) {
                return this._attributeValue(obj, attributes);
            }
        }

        return obj;
    }
}

export default AttributeCallExpression;
