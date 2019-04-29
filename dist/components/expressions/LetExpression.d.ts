import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
import { VariableDeclarationExpression } from './VariableDeclarationExpression';
export declare class LetExpression extends Expression {
    private variableDeclarationExpressions;
    private inContextDef;
    constructor(variableDeclarationExpressions: Array<VariableDeclarationExpression>, inContextDef: Expression);
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
