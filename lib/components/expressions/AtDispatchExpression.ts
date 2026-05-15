import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';
import { BodyBasedExpression } from '@/expressions/BodyBasedExpression';
import { StringAtExpression } from '@/expressions/string/StringAtExpression';
import { AtExpression } from '@/expressions/collection/AtExpression';

/**
 * Runtime dispatcher for at() operation that works for both strings and collections.
 * 
 * This expression resolves the ambiguity between String.at() and Collection.at()
 * by checking the source type at evaluation time and delegating to the appropriate
 * implementation.
 *
 * @oclSpecification OCL 2.4 - Sections 11.2.3 (String) and 11.9.3 (Collection)
 * @oclExpression string.at(index) : String | collection->at(index) : T
 */
export class AtDispatchExpression extends BodyBasedExpression {
    private stringAtExpr: StringAtExpression;
    private collectionAtExpr: AtExpression;

    constructor(source: any) {
        super(source);
        // Create both delegate expressions
        this.stringAtExpr = new StringAtExpression(source);
        this.collectionAtExpr = new AtExpression(source);
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): any {
        const source = this.getSource().evaluate(visitor, localVariables);

        // Dispatch based on runtime type
        if (typeof source === 'string') {
            // Delegate to StringAtExpression
            this.stringAtExpr.setBody(this.getBody());
            return this.stringAtExpr.evaluate(visitor, localVariables);
        } else if (Array.isArray(source)) {
            // Delegate to Collection AtExpression
            this.collectionAtExpr.setBody(this.getBody());
            return this.collectionAtExpr.evaluate(visitor, localVariables);
        }

        // Invalid type - return undefined or empty result
        return typeof source === 'string' ? '' : undefined;
    }

    setBody(body: any): void {
        super.setBody(body);
        // Propagate body to both delegates
        this.stringAtExpr.setBody(body);
        this.collectionAtExpr.setBody(body);
    }
}
