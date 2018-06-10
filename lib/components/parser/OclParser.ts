import * as Expressions from '../expressions';
import { Utils } from '../Utils';
import * as parser from '../../../generator/Parser';

parser.yy = {
    Expression: Expressions,
    Utils
};

export class OclParser {
    static registeredTypes: object = {
        Object,
        String,
        Number,
        Boolean,
        Function
    };

    static parse(oclExpression: any, labels: Array<string> = []): Expressions.PackageDeclaration {
        const packageDeclaration = parser.parse(oclExpression) as Expressions.PackageDeclaration;
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
