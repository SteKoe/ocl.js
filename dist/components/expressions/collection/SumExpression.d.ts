import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns the sum of all elements contained in self if they support the '+' operation.
 *
 * @oclExpression sum() : Number
 * @oclExample self.jobs.salary->sum()
 */
export declare class SumExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any;
}
