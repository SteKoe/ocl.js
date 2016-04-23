import Expression from './expression';
import Utils from '../Utils';

export default class OclIsTypeOfExpression extends Expression {
    constructor(source, value) {
        super();
        this.source = source;
        this.value = value;
    }

    evaluate() {
        return Utils.getClassName(this.source) === Utils.getClassName(this.value);
    }
}
