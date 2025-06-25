import {OclExecutionContext} from '../OclExecutionContext';

export abstract class Expression {
    private readonly type: string;
    private readonly id: string;

    constructor() {
        this.type = this.constructor.name;
        this.id = this.generateId();
    }

    getId(): string {
        return this.id;
    }

    private generateId(): string {
        return `${Math.random().toString(16).substring(2, 32)}`;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    accept(obj?: OclExecutionContext): boolean {
        return true;
    }

    abstract evaluate(visitor: OclExecutionContext, localVariables?: any): any;
}

