import Expression from './expression';

class ExistsExpression extends Expression {
    constructor(source, iterator, expression) {
        super();
        this.source = source;
        this.iterator = iterator;
        this.expression = expression;
    }

    evaluate(obj) {
        return this.source.evaluate(obj).some(o => {
            const variables = {};
            variables[this.iterator] = o;
            return this.expression.evaluate(o, variables);
        });
    }
}

export default ExistsExpression;
