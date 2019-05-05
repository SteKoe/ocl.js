import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';
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
export declare class LetExpression extends Expression {
    private variableDeclarationExpressions;
    private inContextDef;
    constructor(variableDeclarationExpressions: Array<VariableDeclarationExpression>, inContextDef: Expression);
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
