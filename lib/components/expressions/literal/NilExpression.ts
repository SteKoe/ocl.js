import { LiteralExpression } from './LiteralExpression';

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue(): void {
        return;
    }
}
