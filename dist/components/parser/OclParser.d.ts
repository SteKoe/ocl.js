import * as Expressions from '../expressions';
export declare class OclParser {
    static registeredTypes: object;
    static registeredEnums: object;
    static parseQuery(oclExpression: any, registeredTypes?: object): Expressions.Expression;
    static parse(oclExpression: any, labels?: Array<string>, registeredTypes?: object): Expressions.PackageDeclaration;
    static _lex(oclExpression: string): void;
}
