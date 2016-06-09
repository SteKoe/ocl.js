import Expression from './expression';
import InvariantExpression from './invariantExpression';
import LetExpression from './letExpression';
import Utils from '../utils';

export default class ContextExpression extends Expression {
    constructor(targetType, rules) {
        super();

        if(!(rules instanceof Array)) {
            rules = [rules];
        }

        this.targetType = targetType;
        this.invs = rules.filter(i => i instanceof InvariantExpression);
        this.defs = rules.filter(i => i instanceof LetExpression);
    }

    evaluate(obj) {
        obj = obj || {};

        if(this.targetType === this._getClassName(obj)) {
            this.defs.forEach(def => def.evaluate(obj));
            const map = this.invs.map(i => i.evaluate(obj));
            return !map.some(i => i === false);
        }

        return false;
    }

    _getClassName(obj) {
        return Utils.getClassName(obj);
    }
}
