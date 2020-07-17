import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

/**
 * Resolves enumeration values.
 */
export class EnumerationExpression extends Expression {
    private readonly enumeration: string;
    private readonly field: string;

    constructor(source) {
        super();
        const [enumeration, field] = source.split('::');

        this.enumeration = enumeration;
        this.field = field;
    }

    evaluate(visitor: OclExecutionContext): any {
        const enumeration = visitor.getRegisteredEnumeration(this.enumeration);
        if (enumeration) {
            return enumeration[this.field];
        }
    }
}
