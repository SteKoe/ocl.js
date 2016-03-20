import Expression from './expression';

class ExistsExpression extends Expression {
    constructor(source, iterator, expression) {
        super();
        this.source = source;
        this.iterator = iterator;
        this.expression = expression;
    }

    evaluate(obj) {
        const collection = this.source.evaluate(obj);
        if (collection instanceof Array) {
            return collection.some(o => {
                const variables = {};
                variables[this.iterator] = o;
                return this.expression.evaluate(o, variables);
            });
        } else {
            return false;
        }
    }
}

export default ExistsExpression;
