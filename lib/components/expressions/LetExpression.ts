import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';
import { VariableDeclarationExpression } from './VariableDeclarationExpression';

/**
 * @oclSpecification
 * Sometimes a sub-expression is used more than once in a constraint.
 * The let expression allows one to define a variable that can be used in the constraint.
 *
 * @oclExample
 * context Person inv:
 *      let income : Integer = self.job.salary->sum() in
 *      if isUnemployed then
 *          income < 100
 *      else
 *          income >= 100
 *      endif
 */
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
