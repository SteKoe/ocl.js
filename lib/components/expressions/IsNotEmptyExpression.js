import { IsEmptyExpression } from "./IsEmptyExpression";

export class IsNotEmptyExpression extends IsEmptyExpression {
    evaluate(obj, variables) {
        const isEmptyExpression = new IsEmptyExpression(this.source);
        return !isEmptyExpression.evaluate(obj, variables);
    }
}
