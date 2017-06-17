import {Expression} from './expression';
import {Utils} from '../utils';

export class OclIsTypeOfExpression extends Expression {
    constructor(source, value) {
        super();
        this.source = source;
        this.value = value;
    }

    evaluate() {
        return Utils.getClassName(this.source) === Utils.getClassName(this.value);
    }
}
