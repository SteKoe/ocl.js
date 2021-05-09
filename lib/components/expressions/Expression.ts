import { OclExecutionContext } from '../OclExecutionContext';

export abstract class Expression {
    private readonly type: string;

    constructor() {
        this.type = this.constructor.name;
    }

    accept(obj?: OclExecutionContext): boolean {
        return true;
    }

    abstract evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}

export abstract class SourceBasedExpression extends Expression {
    private readonly source: any;

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

    _evaluateBodyAndSource(visitor: OclExecutionContext, localVariables?: any): { source: any, body: any } {
        const body = this.getSource()
            .evaluate(visitor, localVariables);

        const source = this.getBody()
            .evaluate(visitor, localVariables);

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
