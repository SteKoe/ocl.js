import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * Returns true if the given expr evaluated on the body returns only different values.
 *
 * @oclExpression isUnique(expr : oclExpression) : boolean
 * @oclExample self.collection->isUnique(self > 3)
 */
export declare class IsUniqueExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext): any;
}
