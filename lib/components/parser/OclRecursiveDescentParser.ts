import { Lexer, Token, TokenType } from './Lexer';
import * as Expressions from '../expressions';
import { Operator } from '../expressions/OperationCallExpression';
import { ContextExpression } from '../expressions/context/ContextExpression';
import { InvariantExpression } from '../expressions/InvariantExpression';
import { DefExpression } from '../expressions/DefExpression';
import { InitExpression } from '../expressions/InitExpression';
import { DeriveExpression } from '../expressions/DeriveExpression';
import { PreExpression } from '../expressions/PreExpression';
import { PostExpression } from '../expressions/PostExpression';
import { Utils } from '../Utils';

/**
 * Operator precedence levels for Pratt parsing
 * Higher number = tighter binding
 */
enum Precedence {
    NONE = 0,
    IMPLIES = 1,      // implies
    OR = 2,           // or, xor
    AND = 3,          // and
    EQUALITY = 4,     // =, <>
    COMPARISON = 5,   // <, <=, >, >=
    ADDITIVE = 6,     // +, -
    MULTIPLICATIVE = 7, // *, /, mod
    POWER = 8,        // ^
    UNARY = 9,        // not, unary -
    CALL = 10,        // ., ->, ()
}

/**
 * Get the precedence of a binary operator token
 */
function getPrecedence(type: TokenType): Precedence {
    switch (type) {
        case TokenType.IMPLIES:
            return Precedence.IMPLIES;
        case TokenType.OR:
        case TokenType.XOR:
            return Precedence.OR;
        case TokenType.AND:
            return Precedence.AND;
        case TokenType.EQ:
        case TokenType.NEQ:
            return Precedence.EQUALITY;
        case TokenType.LT:
        case TokenType.LTE:
        case TokenType.GT:
        case TokenType.GTE:
            return Precedence.COMPARISON;
        case TokenType.PLUS:
        case TokenType.MINUS:
            return Precedence.ADDITIVE;
        case TokenType.STAR:
        case TokenType.SLASH:
        case TokenType.MOD:
            return Precedence.MULTIPLICATIVE;
        case TokenType.CARET:
            return Precedence.POWER;
        case TokenType.DOT:
        case TokenType.ARROW:
        case TokenType.LPAREN:  // For iterator body: expr(body) or expr(x | body)
            return Precedence.CALL;
        default:
            return Precedence.NONE;
    }
}

/**
 * Hand-rolled recursive-descent parser for OCL
 * Uses Pratt parsing for expressions with operator precedence
 */
export class OclRecursiveDescentParser {
    private tokens: Token[] = [];
    private current: number = 0;
    private registeredTypes: Record<string, any> = {};

    /**
     * Parse an OCL expression string
     */
    parse(input: string, registeredTypes?: Record<string, any>): Expressions.Expression {
        this.registeredTypes = registeredTypes ?? {};
        const lexer = new Lexer(input);
        this.tokens = lexer.tokenize();
        this.current = 0;

        // Try to parse as package/context declaration first, then as standalone expression
        const result = this.parseStart();
        this.expect(TokenType.EOF);
        return result;
    }

    // ==================== Top-level rules ====================

    /**
     * start : packageDecl EOF | oclExpression EOF
     */
    private parseStart(): Expressions.Expression {
        // Check if it starts with 'package' or 'context' keyword
        if (this.check(TokenType.PACKAGE)) {
            return this.parsePackageDecl();
        } else if (this.check(TokenType.CONTEXT)) {
            return this.parseContextDeclList();
        } else {
            // Standalone OCL expression
            return this.parseOclExpression();
        }
    }

    /**
     * packageDecl : 'package' pathName contextDeclList 'endpackage'
     */
    private parsePackageDecl(): Expressions.PackageDeclaration {
        this.expect(TokenType.PACKAGE);
        const pathName = this.parsePathName();
        const contexts = this.parseContextDeclListUntil(TokenType.ENDPACKAGE);
        this.expect(TokenType.ENDPACKAGE);
        return new Expressions.PackageDeclaration(pathName, contexts);
    }

    /**
     * Parse context declarations until EOF (no package wrapper)
     */
    private parseContextDeclList(): Expressions.PackageDeclaration {
        const contexts = this.parseContextDeclListUntil(TokenType.EOF);
        return new Expressions.PackageDeclaration('unnamed', contexts);
    }

    /**
     * Parse context declarations until a terminating token
     */
    private parseContextDeclListUntil(terminator: TokenType): ContextExpression[] {
        const contexts: ContextExpression[] = [];
        while (!this.check(terminator) && !this.isAtEnd()) {
            contexts.push(this.parseContextDeclaration());
        }
        return contexts;
    }

    /**
     * contextDeclaration : classifierContextDecl | propertyContextDecl | operationContextDecl
     */
    private parseContextDeclaration(): ContextExpression {
        this.expect(TokenType.CONTEXT);

        // Look ahead to determine context type
        // - If we see pathName ':' type, it's propertyContextDecl
        // - If we see pathName '(' ..., it's operationContextDecl
        // - Otherwise it's classifierContextDecl

        const pathName = this.parsePathName();

        if (this.check(TokenType.COLON)) {
            // propertyContextDecl: 'context' pathName ':' type initOrDerValueList
            this.advance(); // consume ':'
            this.parseType(); // type is parsed but not used in PropertyContextExpression
            const initOrDerValues = this.parseInitOrDerValueList();
            return new Expressions.PropertyContextExpression(pathName, initOrDerValues);
        } else if (this.check(TokenType.LPAREN)) {
            // operationContextDecl: 'context' operation prePostOrBodyDeclList
            const operation = this.parseOperationRest(pathName);
            const prePostOrBody = this.parsePrePostOrBodyDeclList();
            return new Expressions.OperationContextExpression(operation, prePostOrBody, this.registeredTypes);
        } else {
            // classifierContextDecl: 'context' pathName invOrDefList
            const invOrDefs = this.parseInvOrDefList();
            return new Expressions.ClassifierContextExpression(pathName, invOrDefs);
        }
    }

    /**
     * operation : pathName '(' variableDeclarationListOptional ')' typeOptional
     * (pathName already parsed, this parses the rest)
     */
    private parseOperationRest(pathName: string): { pathName: string; params: string[]; returnType: string } {
        this.expect(TokenType.LPAREN);
        const params = this.parseVariableDeclarationListOptional();
        this.expect(TokenType.RPAREN);
        const returnType = this.parseTypeOptional() ?? 'void';
        return { pathName, params, returnType };
    }

    /**
     * prePostOrBodyDeclList : prePostOrBodyDecl+
     */
    private parsePrePostOrBodyDeclList(): Array<PreExpression | PostExpression> {
        const list: Array<PreExpression | PostExpression> = [];
        while (this.check(TokenType.PRE) || this.check(TokenType.POST) || this.check(TokenType.BODY)) {
            const decl = this.parsePrePostOrBodyDecl();
            if (decl) {
                list.push(decl);
            }
        }
        return list;
    }

    /**
     * prePostOrBodyDecl : 'pre' simpleNameOptional ':' oclExpression
     *                   | 'post' simpleNameOptional ':' oclExpression
     *                   | 'body' simpleNameOptional ':' oclExpression
     */
    private parsePrePostOrBodyDecl(): PreExpression | PostExpression | null {
        if (this.match(TokenType.PRE)) {
            this.parseSimpleNameOptional();
            this.expect(TokenType.COLON);
            const expr = this.parseOclExpression();
            return new Expressions.PreExpression(expr);
        } else if (this.match(TokenType.POST)) {
            this.parseSimpleNameOptional();
            this.expect(TokenType.COLON);
            const expr = this.parseOclExpression();
            return new Expressions.PostExpression(expr);
        } else if (this.match(TokenType.BODY)) {
            this.parseSimpleNameOptional();
            this.expect(TokenType.COLON);
            // body expressions are not currently implemented in the Expression types
            this.parseOclExpression();
            return null;
        }
        throw this.error('Expected pre, post, or body');
    }

    /**
     * initOrDerValueList : initOrDerValue+
     */
    private parseInitOrDerValueList(): Array<InitExpression | DeriveExpression> {
        const list: Array<InitExpression | DeriveExpression> = [];
        while (this.check(TokenType.INIT) || this.check(TokenType.DERIVE)) {
            list.push(this.parseInitOrDerValue());
        }
        return list;
    }

    /**
     * initOrDerValue : 'init' ':' oclExpression | 'derive' ':' oclExpression
     */
    private parseInitOrDerValue(): InitExpression | DeriveExpression {
        if (this.match(TokenType.INIT)) {
            this.expect(TokenType.COLON);
            const expr = this.parseOclExpression();
            return new Expressions.InitExpression(expr);
        } else if (this.match(TokenType.DERIVE)) {
            this.expect(TokenType.COLON);
            const expr = this.parseOclExpression();
            return new Expressions.DeriveExpression(expr);
        }
        throw this.error('Expected init or derive');
    }

    /**
     * invOrDefList : invOrDef+
     */
    private parseInvOrDefList(): Array<InvariantExpression | DefExpression> {
        const list: Array<InvariantExpression | DefExpression> = [];
        while (this.check(TokenType.INV) || this.check(TokenType.DEF)) {
            list.push(this.parseInvOrDef());
        }
        return list;
    }

    /**
     * invOrDef : 'inv' simpleNameOptional ':' oclExpression
     *          | 'def' simpleNameOptional ':' defExpression
     */
    private parseInvOrDef(): InvariantExpression | DefExpression {
        if (this.match(TokenType.INV)) {
            const name = this.parseSimpleNameOptional() ?? '';
            this.expect(TokenType.COLON);
            const expr = this.parseOclExpression();
            return new Expressions.InvariantExpression(expr, name);
        } else if (this.match(TokenType.DEF)) {
            const name = this.parseSimpleNameOptional() ?? '';
            this.expect(TokenType.COLON);
            const defExpr = this.parseDefExpression();
            return new Expressions.DefExpression(name, defExpr);
        }
        throw this.error('Expected inv or def');
    }

    /**
     * defExpression : simpleNameExpression typeOptional '=' oclExpression
     *               | simpleNameExpression '(' simpleNameExpression typeOptional ')' typeOptional '=' oclExpression
     */
    private parseDefExpression(): Expressions.Expression {
        const name = this.parseSimpleNameExpression();

        if (this.match(TokenType.LPAREN)) {
            // Function definition: simpleNameExpression '(' simpleNameExpression typeOptional ')' typeOptional '=' oclExpression
            this.parseSimpleNameExpression(); // param name (not used in DefExpression)
            this.parseTypeOptional();
            this.expect(TokenType.RPAREN);
            this.parseTypeOptional();
            this.expect(TokenType.EQ);
            const body = this.parseOclExpression();
            return new Expressions.DefExpression(name, body);
        } else {
            // Variable definition: simpleNameExpression typeOptional '=' oclExpression
            this.parseTypeOptional();
            this.expect(TokenType.EQ);
            const body = this.parseOclExpression();
            return new Expressions.DefExpression(name, body);
        }
    }

    // ==================== Expression parsing (Pratt parser) ====================

    /**
     * Parse an OCL expression using Pratt parsing
     */
    private parseOclExpression(): Expressions.Expression {
        return this.parsePrecedence(Precedence.NONE);
    }

    /**
     * Pratt parser: parse expression at given precedence level
     */
    private parsePrecedence(minPrecedence: Precedence): Expressions.Expression {
        let left = this.parsePrefix();

        while (!this.isAtEnd()) {
            const precedence = getPrecedence(this.peek().type);
            if (precedence <= minPrecedence) {
                break;
            }
            left = this.parseInfix(left, precedence);
        }

        return left;
    }

    /**
     * Parse prefix expressions (literals, identifiers, unary operators, groupings)
     */
    private parsePrefix(): Expressions.Expression {
        const token = this.peek();

        // Literals
        if (this.match(TokenType.NUMBER)) {
            return new Expressions.NumberExpression(token.value);
        }
        if (this.match(TokenType.STRING)) {
            return new Expressions.StringExpression(token.value);
        }
        if (this.match(TokenType.TRUE)) {
            return new Expressions.BooleanExpression(true);
        }
        if (this.match(TokenType.FALSE)) {
            return new Expressions.BooleanExpression(false);
        }
        if (this.match(TokenType.NIL)) {
            return new Expressions.NilExpression();
        }

        // Unary not
        if (this.match(TokenType.NOT)) {
            const operand = this.parsePrecedence(Precedence.UNARY);
            return new Expressions.NotExpression(operand);
        }

        // Unary minus
        if (this.match(TokenType.MINUS)) {
            const operand = this.parsePrecedence(Precedence.UNARY);
            return new Expressions.MultiplyExpression(new Expressions.NumberExpression(-1), operand);
        }

        // Parenthesized expression
        if (this.match(TokenType.LPAREN)) {
            const expr = this.parseOclExpression();
            this.expect(TokenType.RPAREN);
            return expr;
        }

        // If expression
        if (this.match(TokenType.IF)) {
            return this.parseIfExpression();
        }

        // Let expression
        if (this.match(TokenType.LET)) {
            return this.parseLetExpression();
        }

        // Identifier / path name
        if (this.check(TokenType.IDENTIFIER) || this.check(TokenType.ESCAPED_IDENTIFIER)) {
            return this.parseIdentifierExpression();
        }

        throw this.error(`Unexpected token: ${token.type} (${token.value})`);
    }

    /**
     * Parse infix expressions (binary operators, method calls, arrow calls)
     */
    private parseInfix(left: Expressions.Expression, precedence: Precedence): Expressions.Expression {
        const token = this.peek();

        // Binary operators
        if (this.match(TokenType.PLUS)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.AdditionExpression(left, right);
        }
        if (this.match(TokenType.MINUS)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.SubstractionExpression(left, right);
        }
        if (this.match(TokenType.STAR)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.MultiplyExpression(left, right);
        }
        if (this.match(TokenType.SLASH)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.DivideExpression(left, right);
        }
        if (this.match(TokenType.CARET)) {
            // Power is right-associative, so use precedence - 1
            const right = this.parsePrecedence(precedence - 1);
            return new Expressions.PowerExpression(left, right);
        }
        if (this.match(TokenType.MOD)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.ModuloExpression(left, right);
        }

        // Comparison operators
        if (this.match(TokenType.LT)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OperationCallExpression(Operator.LESS_THAN, left, right);
        }
        if (this.match(TokenType.LTE)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OperationCallExpression(Operator.LESS_EQUAL_THAN, left, right);
        }
        if (this.match(TokenType.GT)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OperationCallExpression(Operator.GREATER_THAN, left, right);
        }
        if (this.match(TokenType.GTE)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OperationCallExpression(Operator.GREATER_EQUAL_THAN, left, right);
        }
        if (this.match(TokenType.EQ)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OperationCallExpression(Operator.EQUAL, left, right);
        }
        if (this.match(TokenType.NEQ)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OperationCallExpression(Operator.NOT_EQUAL, left, right);
        }

        // Logical operators
        if (this.match(TokenType.AND)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.AndExpression(left, right);
        }
        if (this.match(TokenType.OR)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.OrExpression(left, right);
        }
        if (this.match(TokenType.XOR)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.XorExpression(left, right);
        }
        if (this.match(TokenType.IMPLIES)) {
            const right = this.parsePrecedence(precedence);
            return new Expressions.ImpliesExpression(left, right);
        }

        // Method call: expr '.' name '(' args ')' or expr '.' name
        if (this.match(TokenType.DOT)) {
            return this.parseDotExpression(left);
        }

        // Arrow call: expr '->' name
        if (this.match(TokenType.ARROW)) {
            return this.parseArrowExpression(left);
        }

        // Iterator body: expr '(' iterators '|' body ')' or expr '(' body ')'
        if (this.check(TokenType.LPAREN)) {
            return this.parseIteratorBody(left);
        }

        throw this.error(`Unexpected infix token: ${token.type}`);
    }

    /**
     * Parse dot expression: expr '.' name ['(' args ')'] ['@' 'pre']
     */
    private parseDotExpression(source: Expressions.Expression): Expressions.Expression {
        const name = this.parseSimpleNameExpression();

        // Check for @pre suffix first (before checking for parentheses)
        // This handles cases like "self.age@pre"
        
        if (this.check(TokenType.LPAREN)) {
            // Method call with arguments
            this.advance(); // consume '('
            const args = this.parseOclExpressionListOptional();
            this.expect(TokenType.RPAREN);
            
            // Check for @pre after method call
            this.parsePreOptional();
            
            return this.createFunctionCallExpression(name, source, args);
        } else {
            // Property access: expr.name => VariableExpression with compound name
            // OR navigation that will be used as iterator source
            this.parsePreOptional();
            
            if (source instanceof Expressions.VariableExpression) {
                return new Expressions.VariableExpression([source.source, name].join('.'));
            }
            return source;
        }
    }

    /**
     * Parse arrow expression: expr '->' name
     * The optional body '(' [body] ')' is handled by parseIteratorBody in the main loop
     */
    private parseArrowExpression(source: Expressions.Expression): Expressions.Expression {
        const name = this.parseSimpleNameExpression();
        return this.createFunctionCallExpression(name, source, undefined);
    }

    /**
     * Parse iterator body: '(' [iterators '|'] body ')'
     * This handles: expr(...), expr(x | body), expr(x, y | body), expr(literal, ...)
     */
    private parseIteratorBody(expr: Expressions.Expression): Expressions.Expression {
        this.expect(TokenType.LPAREN);

        // Check for empty parentheses
        if (this.match(TokenType.RPAREN)) {
            return expr;
        }

        // Try to determine if this is:
        // 1. (iterators '|' body) - iterator with explicit variables
        // 2. (body) - implicit iterator body
        // 3. (literal, literal, ...) - tuple of literals

        // Look for the pipe to decide
        const hasPipe = this.lookAheadForPipe();

        if (hasPipe) {
            // Parse as (iterators '|' body)
            const iterators = this.parseVariableDeclarationList();
            this.expect(TokenType.PIPE);
            const body = this.parseOclExpression();
            this.expect(TokenType.RPAREN);

            if ('setBody' in expr && typeof expr.setBody === 'function') {
                expr.setBody(body);
            }
            if ('setIterators' in expr && typeof expr.setIterators === 'function') {
                expr.setIterators(iterators);
            }
            return expr;
        } else {
            // Parse the first expression
            const first = this.parseOclExpression();

            if (this.match(TokenType.COMMA)) {
                // List of expressions (could be literals or general expressions)
                const items: Expressions.Expression[] = [first];
                do {
                    items.push(this.parseOclExpression());
                } while (this.match(TokenType.COMMA));
                this.expect(TokenType.RPAREN);

                if ('setBody' in expr && typeof expr.setBody === 'function') {
                    expr.setBody(items);
                }
                return expr;
            } else {
                // Single body expression
                this.expect(TokenType.RPAREN);

                if ('setBody' in expr && typeof expr.setBody === 'function') {
                    expr.setBody(first);
                }
                return expr;
            }
        }
    }

    /**
     * Look ahead to check if there's a pipe '|' before the closing paren
     * This helps distinguish between (x | body) and (body)
     */
    private lookAheadForPipe(): boolean {
        let depth = 1;
        let pos = this.current;

        while (pos < this.tokens.length && depth > 0) {
            const token = this.tokens[pos];
            if (token.type === TokenType.LPAREN) {
                depth++;
            } else if (token.type === TokenType.RPAREN) {
                depth--;
            } else if (token.type === TokenType.PIPE && depth === 1) {
                return true;
            }
            pos++;
        }
        return false;
    }

    /**
     * Create a function call expression using the naming convention
     */
    private createFunctionCallExpression(
        fn: string,
        source: Expressions.Expression,
        params?: Expressions.Expression[]
    ): Expressions.Expression {
        const expressionTypeName = Utils.ucfirst(fn) + 'Expression';
        const ExpressionType = (Expressions as any)[expressionTypeName];
        const typeExists = typeof ExpressionType === 'function';

        if (typeExists) {
            const expr = new ExpressionType(source);
            if (expr instanceof Expressions.SubstringExpression && params && params.length > 0) {
                expr.setBody(params);
            } else if (expr instanceof Expressions.BodyBasedExpression && params && params.length > 0) {
                expr.setBody(params[0]);
            }
            return expr;
        } else {
            return new Expressions.NativeJsFunctionCallExpression(source, fn, params ?? []);
        }
    }

    /**
     * Parse if expression: 'if' expr 'then' expr 'else' expr 'endif'
     */
    private parseIfExpression(): Expressions.IfExpression {
        const condition = this.parseOclExpression();
        this.expect(TokenType.THEN);
        const thenExpr = this.parseOclExpression();
        this.expect(TokenType.ELSE);
        const elseExpr = this.parseOclExpression();
        this.expect(TokenType.ENDIF);
        return new Expressions.IfExpression(condition, thenExpr, elseExpr);
    }

    /**
     * Parse let expression: 'let' variableDeclarationList 'in' expr
     */
    private parseLetExpression(): Expressions.LetExpression {
        const declarations = this.parseVariableDeclarationList();
        this.expect(TokenType.IN);
        const body = this.parseOclExpression();
        return new Expressions.LetExpression(declarations, body);
    }

    /**
     * Parse identifier or path name, possibly with @pre suffix
     */
    private parseIdentifierExpression(): Expressions.Expression {
        const pathName = this.parsePathName();
        this.parsePreOptional();

        // Check if it's an enumeration (contains ::) or a variable
        if (pathName.indexOf('::') !== -1) {
            return new Expressions.EnumerationExpression(pathName);
        } else {
            return new Expressions.VariableExpression(pathName);
        }
    }

    // ==================== Helper rules ====================

    /**
     * pathName : simpleNameExpression ('::' simpleNameExpression)*
     */
    private parsePathName(): string {
        let name = this.parseSimpleNameExpression();

        while (this.match(TokenType.DOUBLE_COLON)) {
            name += '::' + this.parseSimpleNameExpression();
        }

        return name;
    }

    /**
     * simpleNameExpression : IDENTIFIER | ESCAPED_IDENTIFIER
     */
    private parseSimpleNameExpression(): string {
        if (this.check(TokenType.IDENTIFIER)) {
            return this.advance().value;
        }
        if (this.check(TokenType.ESCAPED_IDENTIFIER)) {
            return this.advance().value;
        }
        throw this.error('Expected identifier');
    }

    /**
     * simpleNameOptional : simpleNameExpression | ε
     */
    private parseSimpleNameOptional(): string | undefined {
        if (this.check(TokenType.IDENTIFIER) || this.check(TokenType.ESCAPED_IDENTIFIER)) {
            return this.parseSimpleNameExpression();
        }
        return undefined;
    }

    /**
     * type : pathName ['(' simpleNameExpression ')']
     */
    private parseType(): string {
        const name = this.parsePathName();
        if (this.match(TokenType.LPAREN)) {
            this.parseSimpleNameExpression();
            this.expect(TokenType.RPAREN);
        }
        return name;
    }

    /**
     * typeOptional : ':' type | ε
     */
    private parseTypeOptional(): string | undefined {
        if (this.match(TokenType.COLON)) {
            return this.parseType();
        }
        return undefined;
    }

    /**
     * preOptional : '@' 'pre' | ε
     */
    private parsePreOptional(): void {
        if (this.match(TokenType.AT)) {
            this.expect(TokenType.PRE);
        }
    }

    /**
     * variableDeclaration : simpleNameExpression typeOptional ['=' oclExpression]
     */
    private parseVariableDeclaration(): string | Expressions.VariableDeclarationExpression {
        const name = this.parseSimpleNameExpression();
        const type = this.parseTypeOptional();

        if (this.match(TokenType.EQ)) {
            const value = this.parseOclExpression();
            return new Expressions.VariableDeclarationExpression(name, type, value);
        }

        return name;
    }

    /**
     * variableDeclarationList : variableDeclaration (',' variableDeclaration)*
     */
    private parseVariableDeclarationList(): any[] {
        const list: any[] = [];
        list.push(this.parseVariableDeclaration());

        while (this.match(TokenType.COMMA)) {
            list.push(this.parseVariableDeclaration());
        }

        return list;
    }

    /**
     * variableDeclarationListOptional : variableDeclarationList | ε
     */
    private parseVariableDeclarationListOptional(): any[] {
        if (this.check(TokenType.IDENTIFIER) || this.check(TokenType.ESCAPED_IDENTIFIER)) {
            return this.parseVariableDeclarationList();
        }
        return [];
    }

    /**
     * oclExpressionListOptional : oclExpressionList | ε
     */
    private parseOclExpressionListOptional(): Expressions.Expression[] {
        if (this.check(TokenType.RPAREN)) {
            return [];
        }
        return this.parseOclExpressionList();
    }

    /**
     * oclExpressionList : oclExpression (',' oclExpression)*
     */
    private parseOclExpressionList(): Expressions.Expression[] {
        const list: Expressions.Expression[] = [];
        list.push(this.parseOclExpression());

        while (this.match(TokenType.COMMA)) {
            list.push(this.parseOclExpression());
        }

        return list;
    }

    // ==================== Token manipulation ====================

    private peek(): Token {
        return this.tokens[this.current];
    }

    private previous(): Token {
        return this.tokens[this.current - 1];
    }

    private isAtEnd(): boolean {
        return this.peek().type === TokenType.EOF;
    }

    private check(type: TokenType): boolean {
        if (type === TokenType.EOF) {
            return this.isAtEnd();
        }
        if (this.isAtEnd()) return false;
        return this.peek().type === type;
    }

    private advance(): Token {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    private match(type: TokenType): boolean {
        if (this.check(type)) {
            this.advance();
            return true;
        }
        return false;
    }

    private expect(type: TokenType): Token {
        if (this.check(type)) {
            return this.advance();
        }
        throw this.error(`Expected ${type}, got ${this.peek().type}`);
    }

    private error(message: string): Error {
        const token = this.peek();
        return new SyntaxError(`${message} at line ${token.line}, column ${token.column}`);
    }
}
