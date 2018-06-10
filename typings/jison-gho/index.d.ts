declare module 'jison-gho' {
    interface JisonMap {
        [s: number]: string;
    }
    interface JisonLex {
        rules: Array<JisonMap>;
    }
    interface JisonBNF {
        start: Array<JisonMap>;
        input: Array<JisonMap>;
        line: Array<JisonMap>;
        exp: Array<JisonMap>;
        operator: Array<JisonMap>;
    }

    class ABCDEF {
        lexer: any;
    }

    class Parser {
        yy: any;
        assert: any;
        lexer: any;
        constructor(configuration: {lex: JisonLex; bnf: JisonBNF});
        parse(input: string): Parser;
    }
}
