import { SourceBasedExpression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

/**
 */
export class RoundExpression extends SourceBasedExpression {
    evaluate(visitor: OclExecutionContext): any {
        const result = this.getSource()
            .evaluate(visitor);

        return Math.round(result);
    }
}
