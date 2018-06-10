import { LiteralExpression } from './index';
import { OclExecutionContext } from '../../OclExecutionContext';

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue(): void {
        return;
    }
}
