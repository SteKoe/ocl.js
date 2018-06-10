import { OclExecutionContext } from '../OclExecutionContext';

export abstract class Expression {
    variables: any;

    private type: string;

    constructor() {
        this.type = this.constructor.name;
    }

    accept(obj: OclExecutionContext): boolean {
        return true;
    }

    evaluate(visitor: OclExecutionContext): any {
        throw new Error(`Visitor for '${this.type}' not yet implemented!`);
    }
}

export abstract class SourceBasedExpression extends Expression {
    protected source: any;

    constructor(source) {
        super();
        this.source = source;
    }

    getSource(): Expression {
        return this.source;
    }
}

export abstract class BodyBasedExpression extends SourceBasedExpression {
    private body: Expression;

    setBody(body: Expression): any {
        this.body = body;
    }

    getBody(): Expression {
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

    getLeft(): Expression {
        return this.left;
    }

    getRight(): Expression {
        return this.right;
    }

    _visitLeftRightExpression(visitor: OclExecutionContext): { left: any, right: any } {
        this.getLeft().variables = this.variables;
        const left = this.getLeft()
            .evaluate(visitor);

        this.getRight().variables = this.variables;
        const right = this.getRight()
            .evaluate(visitor);

        return {left, right};
    }
}
