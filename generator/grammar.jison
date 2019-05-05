/* lexical grammar */
%lex

BSL                 "\\".
SN_ECSSQ             "_'"
SN_SECESQ            "'"
SN_ECSDQ             "_\""
SN_SECEDQ            "\""

%%

\s+                                 /* skip whitespace */
\-\-[^\n]*                          /* skip comment */
\-?[0-9][0-9_]*\.[0-9_]+            return 'real'
\-?[0-9][0-9_]*                     return 'integer'
"context"\b                         return 'context'
"inv"\b                             return 'inv'
"init"\b                            return 'init'
"in"\b                              return 'in'
"derive"\b                          return 'derive'
"def"\b                             return 'def'
"let"\b                             return 'let'
"true"\b                            return 'true'
"false"\b                           return 'false'
"and"\b                             return 'and'
"or"\b                              return 'or'
"mod"\b                             return 'mod'
"xor"\b                             return 'xor'
"not"\b                             return 'not'
"implies"\b                         return 'implies'
"if"\b                              return 'if'
"pre"\b                             return 'pre'
"post"\b                            return 'post'
"then"\b                            return 'then'
"else"\b                            return 'else'
"endif"\b                           return 'endif'
"package"\b                         return 'package'
"endpackage"\b                      return 'endpackage'
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
"'"([^']|{BSL})*"'"                 return 'string'
"\""([^"]|{BSL})*"\""               return 'string'

{SN_ECSDQ}([^"])*{SN_SECEDQ}        return 'simpleNameEscaped'
{SN_ECSSQ}([^'])*{SN_SECESQ}        return 'simpleNameEscaped'
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
%right 'not' ">" ">=" "<" "<=" "<>"

%token START_FOO START_BAR;
%start start
%% /* language grammar */

start
    : packageDecl EOF
        { return $1 }
    | oclExpression EOF
        { return $1 }
    ;

packageDecl
    : 'package' pathName contextDeclList 'endpackage' 'EOF'
        { return new yy.Expression.PackageDeclaration($2, $3); }
    | contextDeclList 'EOF'
        { return new yy.Expression.PackageDeclaration('unnamed', $1); }
    ;

contextDeclList
    : contextDeclList contextDeclaration
        { $$ = $1.concat($2); }
    | contextDeclaration
        { $$ = [$1]; }
    ;

contextDeclaration
	: classifierContextDecl
	    { $$ = $1; }
	| propertyContextDecl
	    { $$ = $1; }
    | operationContextDecl
        { $$ = $1; }
	;

classifierContextDecl
	: 'context' pathName invOrDefList
	    { $$ = new yy.Expression.ClassifierContextExpression($2, $3); }
	;

propertyContextDecl
	: 'context' pathName ':' type initOrDerValueList
	    { $$ = new yy.Expression.PropertyContextExpression($2, $5); }
	;

operationContextDecl
	: 'context' operation prePostOrBodyDeclList
	    { $$ = new yy.Expression.OperationContextExpression($2, $3, yy.registeredTypes); }
	;

prePostOrBodyDeclList
    : prePostOrBodyDeclList prePostOrBodyDecl
        { $$ = $1.concat($2); }
    | prePostOrBodyDecl
        { $$ = [$1]; }
    ;

prePostOrBodyDecl
	: 'pre' simpleNameOptional ':' oclExpression
	    { $$ = new yy.Expression.PreExpression($4);}
	| 'post' simpleNameOptional ':' oclExpression
	    { $$ = new yy.Expression.PostExpression($4);}
	| 'body' simpleNameOptional ':' oclExpression
	;

operation
    : pathName '(' variableDeclarationListOptional ')' typeOptional
        { $$ = {pathName: $1, params: $3, returnType: $5 }; }
    ;

initOrDerValueList
    : initOrDerValueList initOrDerValue
        { $$ = $1.concat($2); }
    | initOrDerValue
        { $$ = [$1]; }
    ;

initOrDerValue
    : 'init' ':' oclExpression
        { $$ = new yy.Expression.InitExpression($3); }
    | 'derive' ':' oclExpression
        { $$ = new yy.Expression.DeriveExpression($3); }
    ;

invOrDefList
    : invOrDefList invOrDef
        { $$ = $1.concat($2); }
    | invOrDef
        { $$ = [$1]; }
    ;

invOrDef
	: 'inv' simpleNameOptional ':' oclExpression
	    { $$ = new yy.Expression.InvariantExpression($4, $2); }
    | 'def' simpleNameOptional ':' defExpression
        { $$ = new yy.Expression.DefExpression($2, $4); }
	;

oclExpression
	: literalExp
	    { $$ = $1; }
	| pathName preOptional
	    { $$ = ($1.indexOf('::') === -1) ? new yy.Expression.VariableExpression($1) : new yy.Expression.EnumerationExpression($1); }
    | 'not' oclExpression
        { $$ = new yy.Expression.NotExpression($2); }
    | '(' oclExpression ')'
        { $$ = $2; }
    | 'let' variableDeclarationList 'in' oclExpression
        { $$ = new yy.Expression.LetExpression($2, $4); }
    | oclExpression '.' simpleNameExpression '(' oclExpressionListOptional ')'
        { $$ = functionCallExpression(yy, $3, $1, $5); }
    | oclExpression '->' simpleNameExpression
        { $$ = functionCallExpression(yy, $3, $1); }
    | oclExpression '.' simpleNameExpression preOptional
        { $$ = ($1 instanceof yy.Expression.VariableExpression) ? new yy.Expression.VariableExpression([$1.source, $3].join('.')) : $1; }
    | oclExpression '+' oclExpression
        { $$ = new yy.Expression.AdditionExpression($1, $3); }
    | oclExpression '^' oclExpression
        { $$ = new yy.Expression.PowerExpression($1, $3); }
    | oclExpression '-' oclExpression
        { $$ = new yy.Expression.SubstractionExpression($1, $3); }
    | oclExpression '*' oclExpression
        { $$ = new yy.Expression.MultiplyExpression($1, $3); }
    | oclExpression '/' oclExpression
        { $$ = new yy.Expression.DivideExpression($1, $3); }
    | oclExpression 'mod' oclExpression
        { $$ = new yy.Expression.ModuloExpression($1, $3); }
    | '-' oclExpression %prec UMINUS
        { $$ = new yy.Expression.MultiplyExpression(new yy.Expression.NumberExpression(-1), $2); }
    | oclExpression '<' oclExpression
        { $$ = new yy.Expression.OperationCallExpression('<', $1, $3); }
    | oclExpression '<=' oclExpression
        { $$ = new yy.Expression.OperationCallExpression('<=', $1, $3); }
	| oclExpression '=' oclExpression
	    { $$ = new yy.Expression.OperationCallExpression('=', $1, $3); }
	| oclExpression '>=' oclExpression
	    { $$ = new yy.Expression.OperationCallExpression('>=', $1, $3); }
	| oclExpression '>' oclExpression
	    { $$ = new yy.Expression.OperationCallExpression('>', $1, $3); }
	| oclExpression '<>' oclExpression
	    { $$ = new yy.Expression.OperationCallExpression('<>', $1, $3); }
    | oclExpression 'and' oclExpression
	    { $$ = new yy.Expression.AndExpression($1, $3); }
    | oclExpression 'or' oclExpression
	    { $$ = new yy.Expression.OrExpression($1, $3); }
    | oclExpression 'xor' oclExpression
	    { $$ = new yy.Expression.XorExpression($1, $3); }
    | 'if' oclExpression 'then' oclExpression 'else' oclExpression 'endif'
        { $$ = new yy.Expression.IfExpression($2, $4, $6); }
    | oclExpression '(' variableDeclarationList '|' oclExpression ')'
        { $1.setBody($5); $1.setIterators($3); $$ = $1; }
    | oclExpression '(' oclExpression ')'
        { $1.setBody($3); $$ = $1; }
    | oclExpression '(' literalExpList ')'
        { $1.setBody($3); $$ = $1; }
    | oclExpression '(' ')'
        {  }
    | oclExpression 'implies' oclExpression
        { $$ = new yy.Expression.ImpliesExpression($1, $3); }
	;

oclExpressionList
    : oclExpressionList ',' oclExpression
        { $$ = $1.concat($3); }
    | oclExpression
        { $$ = [$1]; }
    ;

defExpression
    : simpleNameExpression typeOptional '=' oclExpression
        { $$ = new yy.Expression.DefExpression($1, $4); }
    | simpleNameExpression '(' simpleNameExpression typeOptional ')' typeOptional '=' oclExpression
        { $$ = new yy.Expression.DefExpression($1, $8); }
	;

typeOptional
    : ':' type
        { $$ = $2; }
    |
    ;

type
	: pathName
	    { $$ = $1; }
	| pathName '(' simpleNameExpression ')'
	    { $$ = $1; }
	;

variableDeclaration
    : simpleNameExpression typeOptional
        { $$ = $1; }
    | simpleNameExpression typeOptional '=' oclExpression
        { $$ = new yy.Expression.VariableDeclarationExpression($1, $2, $4); }
    ;

oclExpressionListOptional
    : oclExpressionList
        { $$ = $1; }
    |
    ;


variableDeclarationListOptional
    : variableDeclarationList
        { $$ = $1; }
    |
    ;

variableDeclarationList
	:  variableDeclarationList ',' variableDeclaration
	    { $$ = [].concat($1).concat($3); }
	| variableDeclaration
	    { $$ = [$1]; }
	;

preOptional
    : '@' 'pre'
        {}
    |
    ;

literalExp
	: primitiveLiteralExp
	    { $$ = $1; }
	;

literalExpList
    : literalExpList ',' literalExp
	    { $$ = [].concat($1).concat($3); }
	| literalExp
	    { $$ = [$1]; }
	;

simpleNameOptional
	: simpleNameExpression
	    { $$ = $1; }
	|
	;

primitiveLiteralExp
	: integer
	    { $$ = new yy.Expression.NumberExpression($1); }
	| real
	    { $$ = new yy.Expression.NumberExpression($1); }
	| string
	    { $$ = new yy.Expression.StringExpression($1); }
	| 'true'
	    { $$ = new yy.Expression.BooleanExpression(true); }
	| 'false'
	    { $$ = new yy.Expression.BooleanExpression(false); }
    | 'nil'
        { $$ = new yy.Expression.NilExpression(); }
	;

pathName
	: simpleNameExpression
	    { $$ = $1; }
	| pathName '::' simpleNameExpression
	    { $$ = $1 + '::' + $3; }
	;


simpleNameExpression
    : simpleName
        { $$ = $1; }
    | simpleNameEscaped
        { $$ = $1.slice(2, -1); }
    ;


/* end of grammar defintion */
%%
/* start of helper functions */

function functionCallExpression(yy, fn, source, params) {
    var expressionTypeName = `${yy.Utils.ucfirst(fn)}Expression`;
    var ExpressionType = yy.Expression[expressionTypeName];
    var typeExists = typeof ExpressionType === 'function';

    if (typeExists) {
        var expr = new ExpressionType(source);
        if (expr instanceof yy.Expression.SubstringExpression && !!params) {
            expr.setBody(params);
         } else if (expr instanceof yy.Expression.BodyBasedExpression && !!params) {
            expr.setBody(params[0]);
        }
        return expr;
    } else {
        return new yy.Expression.NativeJsFunctionCallExpression(source, fn, params);
    }
}
