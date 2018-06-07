export class Expression {
    constructor() {
        this.type = this.constructor.name;
    }

    accept(obj) {
        return true;
    }

    visit(visitor) {
        throw new Error(`Visitor for '${this.type}' not yet implemented!`);
    }
}

export class SourceBasedExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }
}

export class LeftRightBasedExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}