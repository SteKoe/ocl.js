export abstract class Expression {
    variables: any;

    private type: string;

    constructor() {
        this.type = this.constructor.name;
    }

    accept(obj): boolean {
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

    setBody(body: Expression): any {
        this.body = body;
    }

    getBody(): any {
        return this.body;
    }
}

export abstract class IteratorExpression extends BodyBasedExpression {
    private iterators: Array<any>;

    setIterators(iterators: Array<any>): void {
        this.iterators = iterators;
    }

    getIterators(): Array<any> {
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

    getLeft(): any {
        return this.left;
    }

    getRight(): any {
        return this.right;
    }
}
