import { Expression } from "./expression";

export class IteratorExpression extends Expression {
    constructor(source, iterators, body) {
        super();
        this.source = source;
        this.iterators = iterators;
        this.body = body;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if (source instanceof Array) {
            if (!this.iterators || this.iterators.length === 0) {
                return false;
            } else if (this.iterators.length === 1) {
                return this._evaluateOneIterator(obj);
            } else if (this.iterators.length === 2) {
                return this._evaluateTwoIterators(obj);
            }
        } else {
            return false;
        }
    }

    _evaluateOneIterator(obj) {
        const source = this.source.evaluate(obj);
        const variables = {};

        return !source.some(c => {
            variables[this.iterators[0]] = c;
            let result = this.body.evaluate(obj, variables) === false
            variables[this.iterators[0]] = null;
            return result;
        });
    }

    _evaluateTwoIterators(obj) {
        const source = this.source.evaluate(obj);
        const sourceLength = source.length;
        const variables = {};

        for (let i = 0; i < sourceLength; i++) {
            variables[this.iterators[0]] = source[i];

            for (let j = i + 1; j < sourceLength; j++) {
                variables[this.iterators[1]] = source[j];
                let items = this.body.evaluate(obj, variables);

                variables[this.iterators[1]] = null;

                if (items === false) {
                    variables[this.iterators[0]] = null;
                    return false;
                }
            }

            variables[this.iterators[0]] = null;
        }

        return true;
    }
}
