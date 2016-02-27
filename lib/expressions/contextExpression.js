import Expression from './expression';

class ContextExpression extends Expression {
    constructor(targetType) {
        super();
        this.targetType = targetType;
        this.definition;
    }

    evaluate(obj) {
        const objectType = obj.__proto__.constructor.name;
        if(objectType === this.targetType && this.inv && this.inv.evaluate) {
            return this.inv.evaluate(obj);
        }

        return false;
    }
}

export default ContextExpression;
