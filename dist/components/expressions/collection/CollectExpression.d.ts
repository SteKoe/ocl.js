import { IteratorExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';
/**
 * @oclSpecification
 * When we want to specify a collection that is derived from some other collection, but which contains different
 * objects from the original collection (i.e., it is not a sub-collection), we can use a collect operation.
 * The collect operation uses the same syntax as the select and reject.
 *
 * @oclExpression collect(expr : OclExpression) : Collection
 * @oclExample self.children->collect(age)
 */
export declare class CollectExpression extends IteratorExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}
