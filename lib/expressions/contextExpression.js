import Expression from './expression';

class ContextExpression extends Expression {
    constructor(targetType, inv) {
        super();
        this.targetType = targetType;
        this.inv = inv || {};
    }

    evaluate(obj) {
        const objectType = obj.typeName || obj.__proto__.constructor.name;
        if(objectType === this.targetType && this.inv && this.inv.evaluate) {
            return this.inv.evaluate(obj);
        }
        return false;
    }
}

export default ContextExpression;
