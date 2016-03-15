import Expression from './expression';

class IsEmptyExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        return !(source && source.map && source.length != 0);
    }
}

export default IsEmptyExpression;
