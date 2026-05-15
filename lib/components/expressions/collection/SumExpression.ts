import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";
import {LocalVariables} from "../../types";

/**
 * Returns the sum of all elements contained in self if they support the '+' operation.
 *
 * @oclExpression sum() : Number
 * @oclExample self.jobs.salary->sum()
 */
export class SumExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): number {
        const source = this.getSource().evaluate(visitor, localVariables);

        if (source instanceof Array && source instanceof Array) {
            return source.reduce((prev, cur) => prev + cur, 0);
        }

        return 0;
    }
}
