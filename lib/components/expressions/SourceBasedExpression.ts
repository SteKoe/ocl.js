import {Expression} from "./Expression";

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