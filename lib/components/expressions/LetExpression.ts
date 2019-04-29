import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
import { VariableDeclarationExpression } from './VariableDeclarationExpression';

export class LetExpression extends Expression {
    constructor(private variableDeclarationExpressions: Array<VariableDeclarationExpression>, private inContextDef: Expression) {
        super();
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean {
        const variableExpression = this.variableDeclarationExpressions[0];
        const variables = {[variableExpression.getVariableName()]: variableExpression.evaluate(visitor)};

        return this.inContextDef.evaluate(visitor, {...localVariables, ...variables});
    }
}
