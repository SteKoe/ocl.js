/**
 * Token types for the OCL lexer
 */
export enum TokenType {
    // Literals
    NUMBER = 'NUMBER',
    STRING = 'STRING',
    TRUE = 'TRUE',
    FALSE = 'FALSE',
    NIL = 'NIL',

    // Identifiers
    IDENTIFIER = 'IDENTIFIER',
    ESCAPED_IDENTIFIER = 'ESCAPED_IDENTIFIER',

    // Keywords
    CONTEXT = 'CONTEXT',
    INV = 'INV',
    INIT = 'INIT',
    IN = 'IN',
    DERIVE = 'DERIVE',
    DEF = 'DEF',
    LET = 'LET',
    AND = 'AND',
    OR = 'OR',
    MOD = 'MOD',
    XOR = 'XOR',
    NOT = 'NOT',
    IMPLIES = 'IMPLIES',
    IF = 'IF',
    PRE = 'PRE',
    POST = 'POST',
    THEN = 'THEN',
    ELSE = 'ELSE',
    ENDIF = 'ENDIF',
    PACKAGE = 'PACKAGE',
    ENDPACKAGE = 'ENDPACKAGE',
    BODY = 'BODY',

    // Operators
    LPAREN = 'LPAREN',
    RPAREN = 'RPAREN',
    PIPE = 'PIPE',
    ARROW = 'ARROW',
    LTE = 'LTE',
    GTE = 'GTE',
    NEQ = 'NEQ',
    LT = 'LT',
    EQ = 'EQ',
    GT = 'GT',
    DOUBLE_COLON = 'DOUBLE_COLON',
    COLON = 'COLON',
    DOT = 'DOT',
    COMMA = 'COMMA',
    CARET = 'CARET',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    STAR = 'STAR',
    SLASH = 'SLASH',
    AT = 'AT',

    // Special
    EOF = 'EOF',
}

/**
 * A token produced by the lexer
 */
export interface Token {
    type: TokenType;
    value: string;
    line: number;
    column: number;
}

/**
 * Keywords mapping (case-sensitive)
 */
const KEYWORDS: Record<string, TokenType> = {
    'context': TokenType.CONTEXT,
    'inv': TokenType.INV,
    'init': TokenType.INIT,
    'in': TokenType.IN,
    'derive': TokenType.DERIVE,
    'def': TokenType.DEF,
    'let': TokenType.LET,
    'true': TokenType.TRUE,
    'false': TokenType.FALSE,
    'and': TokenType.AND,
    'or': TokenType.OR,
    'mod': TokenType.MOD,
    'xor': TokenType.XOR,
    'not': TokenType.NOT,
    'implies': TokenType.IMPLIES,
    'if': TokenType.IF,
    'pre': TokenType.PRE,
    'post': TokenType.POST,
    'then': TokenType.THEN,
    'else': TokenType.ELSE,
    'endif': TokenType.ENDIF,
    'package': TokenType.PACKAGE,
    'endpackage': TokenType.ENDPACKAGE,
    'nil': TokenType.NIL,
    'body': TokenType.BODY,
};

/**
 * Hand-rolled lexer for OCL
 */
export class Lexer {
    private input: string;
    private pos: number = 0;
    private line: number = 1;
    private column: number = 1;

    constructor(input: string) {
        this.input = input;
    }

    /**
     * Tokenize the entire input and return all tokens
     */
    tokenize(): Token[] {
        const tokens: Token[] = [];
        let token = this.nextToken();
        while (token.type !== TokenType.EOF) {
            tokens.push(token);
            token = this.nextToken();
        }
        tokens.push(token); // Include EOF
        return tokens;
    }

    /**
     * Get the next token
     */
    nextToken(): Token {
        this.skipWhitespaceAndComments();

        if (this.isAtEnd()) {
            return this.makeToken(TokenType.EOF, '');
        }

        const ch = this.peek();

        // Two-character operators (must check before single-char)
        if (this.match('->')) return this.makeToken(TokenType.ARROW, '->');
        if (this.match('<=')) return this.makeToken(TokenType.LTE, '<=');
        if (this.match('>=')) return this.makeToken(TokenType.GTE, '>=');
        if (this.match('<>')) return this.makeToken(TokenType.NEQ, '<>');
        if (this.match('::')) return this.makeToken(TokenType.DOUBLE_COLON, '::');

        // Numbers (including negative numbers - must check before minus operator)
        // -2 (no space) becomes NUMBER(-2), but "- 2" becomes MINUS NUMBER(2)
        if (this.isDigit(ch) || (ch === '-' && this.isDigit(this.peekNext()))) {
            return this.readNumber();
        }

        // Single-character operators
        if (ch === '(') { this.advance(); return this.makeToken(TokenType.LPAREN, '('); }
        if (ch === ')') { this.advance(); return this.makeToken(TokenType.RPAREN, ')'); }
        if (ch === '|') { this.advance(); return this.makeToken(TokenType.PIPE, '|'); }
        if (ch === '<') { this.advance(); return this.makeToken(TokenType.LT, '<'); }
        if (ch === '=') { this.advance(); return this.makeToken(TokenType.EQ, '='); }
        if (ch === '>') { this.advance(); return this.makeToken(TokenType.GT, '>'); }
        if (ch === ':') { this.advance(); return this.makeToken(TokenType.COLON, ':'); }
        if (ch === '.') { this.advance(); return this.makeToken(TokenType.DOT, '.'); }
        if (ch === ',') { this.advance(); return this.makeToken(TokenType.COMMA, ','); }
        if (ch === '^') { this.advance(); return this.makeToken(TokenType.CARET, '^'); }
        if (ch === '+') { this.advance(); return this.makeToken(TokenType.PLUS, '+'); }
        if (ch === '-') { this.advance(); return this.makeToken(TokenType.MINUS, '-'); }
        if (ch === '*') { this.advance(); return this.makeToken(TokenType.STAR, '*'); }
        if (ch === '/') { this.advance(); return this.makeToken(TokenType.SLASH, '/'); }
        if (ch === '@') { this.advance(); return this.makeToken(TokenType.AT, '@'); }

        // Escaped identifier: _"..." or _'...'
        if (this.match('_"')) {
            return this.readEscapedIdentifier('"');
        }
        if (this.match("_'")) {
            return this.readEscapedIdentifier("'");
        }

        // String literals
        if (ch === '"' || ch === "'") {
            return this.readString(ch);
        }

        // Identifiers and keywords
        if (this.isIdentifierStart(ch)) {
            return this.readIdentifier();
        }

        throw new SyntaxError(`Unexpected character '${ch}' at line ${this.line}, column ${this.column}`);
    }

    private skipWhitespaceAndComments(): void {
        while (!this.isAtEnd()) {
            const ch = this.peek();
            if (ch === ' ' || ch === '\t' || ch === '\r') {
                this.advance();
            } else if (ch === '\n') {
                this.advance();
                this.line++;
                this.column = 1;
            } else if (ch === '-' && this.peekNext() === '-') {
                // Skip line comment
                while (!this.isAtEnd() && this.peek() !== '\n') {
                    this.advance();
                }
            } else {
                break;
            }
        }
    }

    private readString(quote: string): Token {
        const startColumn = this.column;
        this.advance(); // consume opening quote
        let value = '';

        while (!this.isAtEnd() && this.peek() !== quote) {
            const ch = this.peek();
            if (ch === '\\') {
                this.advance();
                if (!this.isAtEnd()) {
                    value += this.peek();
                    this.advance();
                }
            } else {
                value += ch;
                this.advance();
            }
        }

        if (this.isAtEnd()) {
            throw new SyntaxError(`Unterminated string at line ${this.line}, column ${startColumn}`);
        }

        this.advance(); // consume closing quote
        return { type: TokenType.STRING, value, line: this.line, column: startColumn };
    }

    private readEscapedIdentifier(quote: string): Token {
        const startColumn = this.column - 2; // account for _" or _'
        let value = '';

        while (!this.isAtEnd() && this.peek() !== quote) {
            value += this.peek();
            this.advance();
        }

        if (this.isAtEnd()) {
            throw new SyntaxError(`Unterminated escaped identifier at line ${this.line}, column ${startColumn}`);
        }

        this.advance(); // consume closing quote
        return { type: TokenType.ESCAPED_IDENTIFIER, value, line: this.line, column: startColumn };
    }

    private readNumber(): Token {
        const startColumn = this.column;
        let value = '';

        // Handle optional leading minus
        if (this.peek() === '-') {
            value += this.peek();
            this.advance();
        }

        // Integer part
        while (!this.isAtEnd() && (this.isDigit(this.peek()) || this.peek() === '_')) {
            if (this.peek() !== '_') {
                value += this.peek();
            }
            this.advance();
        }

        // Decimal part
        if (!this.isAtEnd() && this.peek() === '.' && this.isDigit(this.peekNext())) {
            value += '.';
            this.advance();
            while (!this.isAtEnd() && (this.isDigit(this.peek()) || this.peek() === '_')) {
                if (this.peek() !== '_') {
                    value += this.peek();
                }
                this.advance();
            }
        }

        return { type: TokenType.NUMBER, value, line: this.line, column: startColumn };
    }

    private readIdentifier(): Token {
        const startColumn = this.column;
        let value = '';

        while (!this.isAtEnd() && this.isIdentifierChar(this.peek())) {
            value += this.peek();
            this.advance();
        }

        // Check if it's a keyword
        // Use hasOwnProperty to avoid prototype pollution (e.g., "toString", "valueOf")
        const keywordType = Object.prototype.hasOwnProperty.call(KEYWORDS, value) ? KEYWORDS[value] : undefined;
        if (keywordType !== undefined) {
            return { type: keywordType, value, line: this.line, column: startColumn };
        }

        return { type: TokenType.IDENTIFIER, value, line: this.line, column: startColumn };
    }

    private makeToken(type: TokenType, value: string): Token {
        return { type, value, line: this.line, column: this.column };
    }

    private isAtEnd(): boolean {
        return this.pos >= this.input.length;
    }

    private peek(): string {
        return this.input[this.pos] || '\0';
    }

    private peekNext(): string {
        return this.input[this.pos + 1] || '\0';
    }

    private advance(): string {
        const ch = this.input[this.pos];
        this.pos++;
        this.column++;
        return ch;
    }

    private match(expected: string): boolean {
        if (this.input.substring(this.pos, this.pos + expected.length) === expected) {
            for (let i = 0; i < expected.length; i++) {
                this.advance();
            }
            return true;
        }
        return false;
    }

    private isDigit(ch: string): boolean {
        return ch >= '0' && ch <= '9';
    }

    private isIdentifierStart(ch: string): boolean {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_';
    }

    private isIdentifierChar(ch: string): boolean {
        return this.isIdentifierStart(ch) || this.isDigit(ch);
    }
}
