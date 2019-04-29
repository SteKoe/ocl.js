import { LiteralExpression } from './LiteralExpression';

export class ObjectExpression extends LiteralExpression<any> {
    parseValue(value): any {
        return value;
    }
}
