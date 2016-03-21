import Expression from './expression';

class SizeExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        if(source instanceof Array) {
            return source.length;
        } else if (!source) {
            return 0;
        }

        throw new Error(`Expected Collection, got ${typeof source}`)
    }
}

export default SizeExpression;
