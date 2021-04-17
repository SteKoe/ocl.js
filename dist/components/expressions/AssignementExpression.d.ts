import { LeftRightBasedExpression } from './LeftRightBasedExpression';
import { OclExecutionContext } from './../OclExecutionContext';
/**
 * Assignement
 *
 * @oclExpression Symbol: <-
 * @oclExample 1 <- 2
 */
export declare class AssignementExpression extends LeftRightBasedExpression {
    private readonly variable;
    constructor(left: any, right: any);
    getVariable(): string;
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
