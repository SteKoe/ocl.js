import Expression from './expression';

export class UnionOperation extends Expression {
    constructor(source, body) {
        super();
        this.source = source;
        this.body = body;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        const body = this.body.evaluate(obj);

        if(source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }
        return [];
    }
}

export class AtOperation extends Expression {
    constructor(source, index) {
        super();
        this.source = source;
        this.index = index;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        const index = this.index.evaluate(obj);

        if(source instanceof Array && Number.isInteger(index) && index >= 0 && index < source.length) {
            return source[index];
        }
    }
}

export class FirstOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if(source instanceof Array) {
            return source[0];
        }
    }
}

export class LastOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if(source instanceof Array) {
            return source[source.length - 1];
        }
    }
}

export class AsSetOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if(source instanceof Array) {
            return new Set(source);
        }
    }
}