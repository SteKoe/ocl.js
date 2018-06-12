import * as Expressions from '../expressions';
import { Expression } from '../expressions';
import { Utils } from '../Utils';
import * as parser from '../../../generator/Parser';

parser.yy = {
    Expression: Expressions,
    Utils
};

export class OclParser {
    static registeredTypes: object = {
        Array,
        Boolean,
        Function,
        Number,
        Object,
        String
    };

    static parseQuery(oclExpression: any, registeredTypes?: object): Expression {
        parser.yy.registeredTypes = registeredTypes || {};
        const packageDeclaration = parser.parse(oclExpression) as Expression;

        return packageDeclaration;
    }

    static parse(oclExpression: any, labels: Array<string> = [], registeredTypes?: object): Expressions.PackageDeclaration {
        const packageDeclaration = OclParser.parseQuery(oclExpression, registeredTypes)as Expressions.PackageDeclaration;
        packageDeclaration.setExecutionLabels(labels);

        return packageDeclaration;
    }

    /* tslint:disable:no-console */
    static _lex /* istanbul ignore next */(oclExpression: Expressions.Expression): void {
        const lexer = parser.lexer;
        lexer.setInput(oclExpression);

        while (!lexer.done) {
            const token = lexer.lex();
            let resultingToken;
            /* Look up the token name if necessary */
            if (token in parser.terminals_) {
                resultingToken = parser.terminals_[token];
            }

            console.log(`<${token}, ${lexer.yytext}>`);
        }
    }

    /* tslint:enable:no-console */
}
