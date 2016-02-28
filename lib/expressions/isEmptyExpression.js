import Expression from './expression';

class IsEmptyExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);

        if(source && source.map && source.length != 0) {
            return false;
        }

        return true;
    }
}

export default IsEmptyExpression;
