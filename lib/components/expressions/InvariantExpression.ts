import { Expression } from './Expression';
import { OclVisitor } from '../OclVisitor';

/**
 */
export class InvariantExpression extends Expression {
    private name: string;
    private definition: any;

    constructor(oclExpression, name) {
        super();
        this.name = name || 'anonymous';
        this.definition = oclExpression;
    }

    getName(): string {
        return this.name;
    }

    getDefinition(): any {
        return this.definition;
    }

    visit(visitor: OclVisitor): any {
        return visitor.visitInvariantExpression(this);
    }
}
