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
        if(collection instanceof Array) {
            return collection.filter(o => {
                const variables = {};
                variables[this.iterator] = o;
                return this.expression.evaluate(o, variables);
            });
        } else{
            return [];
        }
    }
}

export default SelectExpression;
