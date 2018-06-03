import {ContextExpression} from "./ContextExpression";
import {InitExpression} from "./InitExpression";
import {DeriveExpression} from "./DeriveExpression";

export class PropertyContextExpression extends ContextExpression {
    constructor(targetType, rules) {
        super();

        const split = targetType.split('::');
        this.targetType = split[0];
        this.propertyName = split[1];

        if (!(rules instanceof Array)) {
            rules = [rules];
        }

        this.inits = rules.filter(i => i instanceof InitExpression);
        this.derived = rules.filter(i => i instanceof DeriveExpression);
    }

    evaluate(obj) {
        obj = obj || {};

        if (this.targetType === this._getClassName(obj)) {
            this.inits.forEach(def => {
                obj[this.propertyName] = def.evaluate(obj);
            });

            this.derived.forEach(def => {
                obj[this.propertyName] = def.evaluate(obj);
            });
        }

        return true;
    }
}