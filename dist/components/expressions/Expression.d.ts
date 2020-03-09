import { OclExecutionContext } from '../OclExecutionContext';
export declare abstract class Expression {
    private type;
    constructor();
    accept(obj: OclExecutionContext): boolean;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
export declare abstract class SourceBasedExpression extends Expression {
    protected source: any;
    constructor(source: any);
    getSource(): Expression;
}
export declare abstract class BodyBasedExpression extends SourceBasedExpression {
    private body;
    setBody(body: Expression): any;
    getBody(): Expression;
    _evaluateBodyAndSource(visitor: OclExecutionContext, localVariables?: any): {
        source: any;
        body: any;
    };
}
export declare abstract class IteratorExpression extends BodyBasedExpression {
    private iterators;
    setIterators(iterators: Array<any>): void;
    getIterators(): Array<any>;
}
