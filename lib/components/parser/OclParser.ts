import * as Expressions from '../expressions';
import {Utils} from '../Utils';
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

    static registeredEnums: object = {};

    static parseQuery(oclExpression: any, registeredTypes?: object): Expressions.Expression {
        parser.yy.registeredTypes = registeredTypes || {};

        return parser.parse(oclExpression) as Expressions.Expression;
    }

    static parse(oclExpression: any, labels: Array<string> = [], registeredTypes?: object): Expressions.PackageDeclaration {
        const packageDeclaration = OclParser.parseQuery(oclExpression, registeredTypes)as Expressions.PackageDeclaration;
        packageDeclaration.setExecutionLabels(labels);
        packageDeclaration.setRawOclExpression(oclExpression);

        return packageDeclaration;
    }

    /* tslint:disable:no-console */
    static _lex /* istanbul ignore next */(oclExpression: string): void {
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
