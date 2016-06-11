import {Expression} from './abstractExpression'; 

export class SelectExpression extends Expression {
    constructor(source, iterator, body) {
        super();
        this.source = source;
        this.iterators = iterator;
        this.body = body;
    }

    evaluate(obj) {
        const collection = this.source.evaluate(obj);
        if (collection instanceof Array) {
            return collection.filter(c => {
                let variables = {};
                if(this.iterators) {
                    variables[this.iterators[0]] = c;
                } else {
                    variables = c;
                }

                return this.body.evaluate(c, variables);
            });
        } else {
            return [];
        }
    }
}
