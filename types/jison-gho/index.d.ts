declare module 'jison-gho' {
    class Parser {
        yy: any;
        assert: any;
        lexer: any;

        constructor(grammar, optionalLexerSection?, options?);

        parse(input): any;

        generate(generatorOptions?: object): string;
    }
}
