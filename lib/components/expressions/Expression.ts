export abstract class Expression {
    variables: any;

    private type: string;

    constructor() {
        this.type = this.constructor.name;
    }

    accept(obj) {
        return true;
    }

    visit(visitor): any {
        throw new Error(`Visitor for '${this.type}' not yet implemented!`);
    }
}

export abstract class SourceBasedExpression extends Expression {
    private source: any;

    constructor(source) {
        super();
        this.source = source;
    }

    getSource(): any {
        return this.source;
    }
}

export abstract class BodyBasedExpression extends SourceBasedExpression {
    private body: Expression;

    setBody(body: Expression) {
        this.body = body;
    }

    getBody() {
        return this.body;
    }
}

export abstract class IteratorExpression extends BodyBasedExpression {
    private iterators: any[];

    setIterators(iterators: any[]) {
        this.iterators = iterators;
    }

    getIterators() {
        return this.iterators;
    }
}

export abstract class LeftRightBasedExpression extends Expression {
    private left: any;
    private right: any;

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    getLeft() {
        return this.left;
    }

    getRight() {
        return this.right;
    }
}