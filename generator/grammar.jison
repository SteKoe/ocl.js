/* lexical grammar */
%lex

%%
\s+                                 /* skip whitespace */
\-\-[^\n]*                          /* skip comment */

\-?[0-9][0-9]*\.[0-9]*              return 'real'
\-?[0-9][0-9]*                      return 'integer'

"context"                           return 'context'
"inv"                               return 'inv'
"init"                              return 'init'
"derive"                            return 'derive'
"def"                               return 'def'
"let"                               return 'let'
"true"                              return 'true'
"false"                             return 'false'
"and"                               return 'and'
"or"                                return 'or'
"mod"                               return 'mod'
"div"                               return 'div'
"xor"                               return 'xor'
"not"\b                             return 'not'
"implies"                           return 'implies'
"if"\b                              return 'if'
"then"                              return 'then'
"else"                              return 'else'
"endif"                             return 'endif'
"package"                           return 'package'
"endpackage"                        return 'endpackage'
"("                                 return '('
")"                                 return ')'
"|"                                 return '|'
"->"                                return '->'
"<="                                return '<='
">="                                return '>='
"<>"                                return '<>'
"<"                                 return '<'
"="                                 return '='
">"                                 return '>'
"::"                                return '::'
":"                                 return ':'
"."                                 return '.'
","                                 return ','
"^"                                 return '^'
"+"                                 return '+'
"-"                                 return '-'
"*"                                 return '*'
"/"                                 return '/'
"@"                                 return '@'
"pre"                               return 'pre'

'nil'                               return 'nil'
["][^\"]*["]          	            return 'string'
['][^\']*[']          	            return 'string'
[a-zA-Z_][a-zA-Z0-9_]*              return 'simpleName'

<<EOF>>               	            return 'EOF'
/lex

/* operator associations and precedence */
%left "implies" "and" "or" "xor"
%left '='
%left '+' '-'
%left '*' '/'
%left '^'
%left 'mod'
%left UMINUS
%right ">" ">=" "<" "<=" "<>"

%start packageDecl
%% /* language grammar */

packageDecl
    : 'package' pathName contextDeclList 'endpackage' 'EOF'
        { return new Expression.PackageDeclaration($2, $3); }
    | contextDeclList 'EOF'
        { return new Expression.PackageDeclaration('unnamed', $1); }
    ;

contextDeclList
    : contextDeclList contextDeclaration
        { $$ = $1.concat($2) }
    | contextDeclaration
        { $$ = [$1] }
    ;

contextDeclaration
	: classifierContextDecl
	    { $$ = $1 }
	| propertyContextDecl
	    { $$ = $1 }
    | operationContextDecl
        { $$ = $1 }
	;

classifierContextDecl
	: 'context' pathName invOrDefList
	    { $$ = new Expression.ContextExpression($2, $3) }
	;

propertyContextDecl
	: 'context' pathName ':' type initOrDerValueList
	    { $$ = new Expression.PropertyContextExpression($2, $5) }
	;

operationContextDecl
	: 'context' operation prePostOrBodyDeclList
	    { $$ = new Expression.OperationContextExpression($2, $3) }
	;

prePostOrBodyDeclList
    : prePostOrBodyDeclList prePostOrBodyDecl
        { $$ = $1.concat($2) }
    | prePostOrBodyDecl
        { $$ = [$1] }
    ;

prePostOrBodyDecl
	: 'pre' simpleNameOptional ':' oclExpression
	    { $$ = new Expression.PreExpression($2, $4) }
	| 'post' simpleNameOptional ':' oclExpression
	| 'body' simpleNameOptional ':' oclExpression
	;

operation
    : pathName '(' variableDeclarationListOptional ')' typeOptional
        { $$ = {pathName: $1, params: $3, returnType: $5 }; }
    ;

initOrDerValueList
    : initOrDerValueList initOrDerValue
        { $$ = $1.concat($2) }
    | initOrDerValue
        { $$ = [$1] }
    ;

initOrDerValue
    : 'init' ':' oclExpression
        { $$ = new Expression.InitExpression($3) }
    | 'derive' ':' oclExpression
        { $$ = new Expression.DeriveExpression($3) }
    ;

invOrDefList
    : invOrDefList invOrDef
        { $$ = $1.concat($2) }
    | invOrDef
        { $$ = [$1] }
    ;

invOrDef
	: 'inv' simpleNameOptional ':' oclExpression
	    { $$ = new Expression.InvariantExpression($4, $2) }
    | 'def' simpleNameOptional ':' defExpression
        { $$ = new Expression.LetExpression($2, $4) }
	;

oclExpression
	: literalExp
	    { $$ = $1 }
	| pathName preOptional
	    { $$ = new Expression.VariableExpression($1) }
    | 'not' oclExpression
        { $$ = new Expression.NotExpression($2) }
    | '(' oclExpression ')'
        { $$ = $2 }
    | oclExpression '.' simpleName '(' oclExpressionListOptional ')'
        { $$ = functionCallExpression($3, $1, $5) }
    | oclExpression '.' simpleName preOptional
        { $$ = ($1 instanceof Expression.VariableExpression) ? new Expression.VariableExpression([$1.variable, $3].join('.')) : $1 }
    | oclExpression '+' oclExpression
        { $$ = new Expression.AdditionExpression($1, $3) }
    | oclExpression '^' oclExpression
        { $$ = new Expression.PowerExpression($1, $3) }
    | oclExpression '-' oclExpression
        { $$ = new Expression.SubstractionExpression($1, $3) }
    | oclExpression '*' oclExpression
        { $$ = new Expression.MultiplyExpression($1, $3) }
    | oclExpression '/' oclExpression
        { $$ = new Expression.DivideExpression($1, $3) }
    | oclExpression 'mod' oclExpression
        { $$ = new Expression.ModuloExpression($1, $3) }
    | oclExpression 'div' oclExpression
        { $$ = new Expression.DivideExpression($1, $3) }
    | '-' oclExpression %prec UMINUS
        {$$ = new Expression.MultiplyExpression(new Expression.NumberExpression(-1), $2);}
    | oclExpression '<' oclExpression
        { $$ = new Expression.OperationCallExpression('<', $1, $3) }
    | oclExpression '<=' oclExpression
        { $$ = new Expression.OperationCallExpression('<=', $1, $3) }
	| oclExpression '=' oclExpression
	    { $$ = new Expression.OperationCallExpression('=', $1, $3) }
	| oclExpression '>=' oclExpression
	    { $$ = new Expression.OperationCallExpression('>=', $1, $3) }
	| oclExpression '>' oclExpression
	    { $$ = new Expression.OperationCallExpression('>', $1, $3) }
	| oclExpression '<>' oclExpression
	    { $$ = new Expression.OperationCallExpression('<>', $1, $3) }
    | oclExpression 'and' oclExpression
	    { $$ = new Expression.AndExpression($1, $3) }
    | oclExpression 'or' oclExpression
	    { $$ = new Expression.OrExpression($1, $3) }
    | oclExpression 'xor' oclExpression
	    { $$ = new Expression.XorExpression($1, $3) }
    | 'if' oclExpression 'then' oclExpression 'else' oclExpression 'endif'
        { $$ = new Expression.IfExpression($2, $4, $6) }
    | oclExpression '->' simpleName
        { $$ = functionCallExpression($3, $$); }
    | oclExpression '(' variableDeclarationList '|' oclExpression ')'
        { $1.body = $5; $1.iterators = $3; $$ = $1 }
    | oclExpression '(' oclExpression ')'
        { $1.body = $3; $$ = $1 }
    | oclExpression '(' literalExpList ')'
        { $1.body = $3; $$ = $1 }
    | oclExpression '(' ')'
        {  }
    | oclExpression 'implies' oclExpression
        { $$ = new Expression.ImpliesExpression($1, $3) }
	;

oclExpressionList
    : oclExpressionList ',' oclExpression
        { $$ = $1.concat($3) }
    | oclExpression
        { $$ = [$1] }
    ;

defExpression
    : simpleName typeOptional '=' oclExpression
        { $$ = new Expression.LetExpression($1, $4) }
    | simpleName '(' simpleName typeOptional ')' typeOptional '=' oclExpression
        { $$ = new Expression.LetExpression($1, $8) }
	;

typeOptional
    : ':' type
        { $$ = $2 }
    |
    ;

type
	: pathName
	    { $$ = $1 }
	| pathName '(' simpleName ')'
	    { $$ = $1 }
	;

variableDeclaration
    : simpleName typeOptional
        { $$ = $1 }
    ;

oclExpressionListOptional
    : oclExpressionList
        { $$ = $1 }
    |
    ;


variableDeclarationListOptional
    : variableDeclarationList
        { $$ = $1 }
    |
    ;

variableDeclarationList
	:  variableDeclarationList ',' variableDeclaration
	    { $$ = [].concat($1).concat($3) }
	| variableDeclaration
	    { $$ = [$1] }
	;

preOptional
    : '@' 'pre'
        {}
    |
    ;

literalExp
	: primitiveLiteralExp
	    { $$ = $1 }
	;

literalExpList
    : literalExpList ',' literalExp
	    { $$ = [].concat($1).concat($3) }
	| literalExp
	    { $$ = [$1] }
	;

simpleNameOptional
	: simpleName
	    { $$ = $1 }
	|
	;

primitiveLiteralExp
	: integer
	    { $$ = new Expression.NumberExpression($1) }
	| real
	    { $$ = new Expression.NumberExpression($1) }
	| string
	    { $$ = new Expression.StringExpression($1) }
	| 'true'
	    { $$ = new Expression.BooleanExpression(true) }
	| 'false'
	    { $$ = new Expression.BooleanExpression(false) }
    | 'nil'
        { $$ = new Expression.NilExpression() }
	;

pathName
	: simpleName
	    { $$ = $1 }
	| pathName '::' simpleName
	    { $$ = $1 + '::' + $3 }
	;

/* end of grammar defintion */
%%
/* start of helper functions */

function functionCallExpression(fn, source, params) {
    let expressionTypeName = `${Utils.ucfirst(fn)}Expression`
    let ExpressionType = Expression[expressionTypeName];
    let typeExists = typeof ExpressionType === 'function'

    if (typeExists && !params) {
        return new ExpressionType(source);
    } else {
        return new Expression.NativeJsFunctionCallExpression(source, fn, params);
    }
}