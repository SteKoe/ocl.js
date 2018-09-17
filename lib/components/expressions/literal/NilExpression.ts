import {LiteralExpression} from './index';

export class NilExpression extends LiteralExpression<void> {
    constructor() {
        super(undefined);
    }

    parseValue(): void {
        return;
    }
}
