import { Expression } from './Expression'
import { Utils } from '../Utils'

export class ContextExpression extends Expression {
    constructor() {
        super();
        this.labels = [];
    }

    accept(visitor) {
        if (visitor.labelsToExecute.length === 0 || this.labels.length === 0) {
            return true;
        }

        return Utils.intersect(this.labels, visitor.labelsToExecute).length > 0;
    }
}