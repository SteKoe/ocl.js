import { OclExecutionContext } from '../OclExecutionContext';
import { ContextExpression } from './context/ContextExpression';
import { Expression } from './Expression';
/**
 * In order to group and organise OCL constraints, packages can be used.
 */
export declare class PackageDeclaration extends Expression {
    private readonly contexts;
    private labels;
    private oclExpression;
    constructor(type: any, contexts: Array<ContextExpression>);
    accept(visitor: OclExecutionContext): boolean;
    getContexts(): Array<ContextExpression>;
    setExecutionLabels(labels: Array<string>): any;
    setRawOclExpression(oclExpression: string): void;
    getRawOclExpression(): string;
    evaluate(visitor: OclExecutionContext): any;
}
