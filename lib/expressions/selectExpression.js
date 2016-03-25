import Expression from './expression';

class SelectExpression extends Expression {
    constructor(source, iterator, expression) {
        super();
        this.source = source;
        this.iterator = iterator;
        this.expression = expression;
    }

    evaluate(obj) {
        const collection = this.source.evaluate(obj);
        if (collection instanceof Array) {
            return collection.filter(c => {
                let variables = {};
                if(this.iterator.length === 1) {
                    variables[this.iterator[0]] = c;
                } else {
                    variables = c;
                }

                return this.expression.evaluate(c, variables);
            });
        } else {
            return [];
        }
    }
}

export default SelectExpression;
