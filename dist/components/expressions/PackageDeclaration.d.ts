import { ContextExpression } from './context/ContextExpression';
import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';
/**
 * In order to group and organise OCL constraints, packages can be used.
 */
export declare class PackageDeclaration extends Expression {
    private contexts;
    private labels;
    constructor(type: any, contexts: Array<ContextExpression>);
    accept(visitor: OclExecutionContext): boolean;
    getContexts(): Array<ContextExpression>;
    setExecutionLabels(labels: Array<string>): any;
    evaluate(visitor: OclExecutionContext): any;
}
