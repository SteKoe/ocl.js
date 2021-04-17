import { LiteralExpression } from './LiteralExpression';
export declare class NilExpression extends LiteralExpression<void> {
    constructor();
    parseValue(): void;
}
