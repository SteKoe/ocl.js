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

    _visitBodyAndSource(visitor: OclExecutionContext): { source: any, body: any } {
        this.getSource().variables = this.variables;
        const body = this.getSource()
            .evaluate(visitor);

        this.getBody().variables = this.variables;
        const source = this.getBody()
            .evaluate(visitor);

        return {source, body};
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
