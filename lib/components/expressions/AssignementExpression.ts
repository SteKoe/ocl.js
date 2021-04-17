import { LeftRightBasedExpression } from './LeftRightBasedExpression';
import { OclExecutionContext } from './../OclExecutionContext';
import { VariableExpression } from './VariableExpression';

/**
 * Assignement
 *
 * @oclExpression Symbol: <-
 * @oclExample 1 <- 2
 */
export class AssignementExpression extends LeftRightBasedExpression {
		private readonly variable: string;

    constructor(left: any, right: any) {
        super(left, right);
				this.variable = '';

				if (left instanceof VariableExpression) {
					let arr = left.variable.split('.');
					this.variable = arr.pop();
					left.variable = arr.join('.');
					left.source = left.variable;
				}
    }

		getVariable(): string {
			return this.variable;
		}

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

				left[this.variable] = right;

        return true;//left + right;
    }
}

