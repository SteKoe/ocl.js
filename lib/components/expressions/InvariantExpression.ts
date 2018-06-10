import { Expression } from './Expression';
import { IOclVisitor } from '../IOclVisitor';

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

    visit(visitor: IOclVisitor): any {
        return visitor.visitInvariantExpression(this);
    }
}
