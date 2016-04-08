import Expression from './expression';
import InvariantExpression from './invariantExpression';
import LetExpression from './letExpression';

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
        this.defs.forEach(def => def.evaluate(obj));
        const map = this.invs.map(i => i.evaluate(obj));
        return !map.some(i => i === false);
    }

    _getClassName(obj) {
        if(typeof obj === 'function') {
            return this._getFunctionName(obj);
        } else if(typeof obj === 'object') {
            const objectTypename = this._getFunctionName(obj.__proto__.constructor.toString());
            return objectTypename;
        }
    }

    _getFunctionName(fn) {
        let name = fn.toString().split(' ')[1];
        name = name.substring(0, name.indexOf('('));
        return name.length > 0 ? name : undefined;
    }
}
