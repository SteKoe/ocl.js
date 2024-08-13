import { OclExecutionContext } from '../../OclExecutionContext';
import {SourceBasedExpression} from "../SourceBasedExpression";

/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
export class AsSetExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        const source = this.getSource()
            .evaluate(visitor, localVariables);

        if (source instanceof Array) {
            return Array.from(new Set(source));
        }
    }
}
