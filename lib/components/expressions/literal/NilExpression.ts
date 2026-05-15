import { LiteralExpression } from './LiteralExpression';
import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

export class NilExpression extends LiteralExpression<null> {
    constructor() {
        super(null);
    }

    parseValue(): null {
        return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): null {
        return visitor.setEvaluatedValue(this, this.getValue()) as null;
    }
}
