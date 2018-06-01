/* lexical grammar */
%lex

%%
\s+                                 /* ignore */
\-?[0-9][0-9]*\.[0-9]*              return 'real'
\-?[0-9][0-9]*                      return 'integer'

"context"                           return 'context'
"inv"                               return 'inv'
"def"                               return 'def'
"let"                               return 'let'
"true"                              return 'true'
"false"                             return 'false'
"and"                               return 'and'
"or"                                return 'or'
"mod"                               return 'mod'
"div"                               return 'div'
"xor"                               return 'xor'
"not"                               return 'not'
"implies"                           return 'implies'
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
"+"                                 return '+'
"-"                                 return '-'
"*"                                 return '*'
"/"                                 return '/'
"@"                                 return '@'
"pre"                               return 'pre'

'nil'                               return 'nil'
[a-zA-Z_][a-zA-Z0-9_]*              return 'simpleName'
["][^\"]*["]          	            return 'string'

<<EOF>>               	            return 'EOF'
.                                   return 'ERROR'

/lex

/* operator associations and precedence */
%left "implies" "and" "or" "xor"
%left '+' '-'
%left '*' '/'
%right "=" ">" ">=" "<" "<=" "<>"

%start contextDeclList
%% /* language grammar */
contextDeclList
	: contextDeclaration EOF
	    { return $1 }
	;

contextDeclaration
	: classifierContextDecl
	    { $$ = $1 }
	;

classifierContextDecl
	: 'context' pathName invOrDefList
	    { $$ = new Expression.ContextExpression($2, $3) }
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
	: pathName preOptional
	    { $$ = new Expression.VariableExpression($1) }
    | '(' oclExpression ')'
        { $$ = $2 }
    | oclExpression '.' simpleName '(' oclExpressionListOptional ')'
        { $$ = methodCallExpression($3, $1, $5) }
    | oclExpression '.' simpleName preOptional
        { $$ = ($1 instanceof Expression.VariableExpression) ? new Expression.VariableExpression([$1.variable, $3].join('.')) : $1 }
    | oclExpression '+' oclExpression
        { $$ = new Expression.AdditionExpression($1, $3) }
    | oclExpression '-' oclExpression
        { $$ = new Expression.AdditionExpression($1, $3) }
    | oclExpression '*' oclExpression
        { $$ = new Expression.MultiplyExpression($1, $3) }
    | oclExpression '/' oclExpression
        { $$ = new Expression.DivideExpression($1, $3) }
    | oclExpression 'mod' oclExpression
        { $$ = new Expression.ModuloExpression($1, $3) }
    | oclExpression 'div' oclExpression
        { $$ = new Expression.DivideExpression($1, $3) }
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
    | oclExpression '->' simpleName
        { $$ = functionCallExpression($3, $$); }
    | oclExpression '(' variableDeclarationList '|' oclExpression ')'
        { $1.body = $5; $1.iterators = $3; $$ = $1 }
    | oclExpression '(' oclExpression ')'
        { $1.body = $3; $$ = $1 }
    | oclExpression '(' ')'
        {  }
    | oclExpression 'implies' oclExpression
        { $$ = new Expression.ImpliesExpression($1, $3) }
	| literalExp
	    { $$ = $1 }
	;

defExpression
	: 'let' simpleName ':' oclExpression
	    { $$ = new Expression.LetExpression($2, $4) }
	| simpleName ':' oclExpression
	    { $$ = new Expression.LetExpression($1, $3) }
	;

type
	: pathName
	    { $$ = $1 }
	;

variableDeclaration
    : simpleName typeOptional
        { $$ = $1 }
    ;

oclExpressionListOptional
    : oclExpression ',' oclExpression
        { $$ = [].concat($1).concat($3) }
    | oclExpressionOptional
        { $$ = [$1] }
    ;

oclExpressionOptional
    : oclExpression
        { $$ = $1 }
    |
    ;

variableDeclarationList
	:  variableDeclarationList ',' variableDeclaration
	    { $$ = [].concat($1).concat($3) }
	| variableDeclaration
	    { $$ = [$1] }
	;

typeOptional
	: ':' type
	    { $$ = $2 }
    |
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
	    { $$ = $1 }
	;

/* end of grammar defintion */
%%
/* start of helper functions */

function functionCallExpression(fn, source) {
    if(fn.toLowerCase() === 'isempty') {
        return new Expression.IsEmptyExpression(source);
    } else if(fn.toLowerCase() === 'isnotempty') {
        return new Expression.IsNotEmptyExpression(source);
    } else if(fn.toLowerCase() === 'size') {
        return new Expression.SizeExpression(source);
    } else if(fn.toLowerCase() === 'forall') {
        return new Expression.IteratorExpression(source);
    } else if(fn.toLowerCase() === 'select') {
        return new Expression.SelectExpression(source);
    } else if(fn.toLowerCase() === 'exists') {
        return new Expression.ExistsExpression(source);
    } else if(fn.toLowerCase() === 'union') {
        return new Expression.UnionOperation(source);
    } else if(fn.toLowerCase() === 'first') {
        return new Expression.FirstOperation(source);
    } else if(fn.toLowerCase() === 'at') {
        return new Expression.AOperation(source);
    } else if(fn.toLowerCase() === 'last') {
        return new Expression.LastOperation(source);
    } else if(fn.toLowerCase() === 'asset') {
        return new Expression.AsSetOperation(source);
    } else if(fn.toLowerCase() === 'oclistypeof') {
        return new Expression.OclIsTypeOfExpression(source);
    }

    throw new Error(`No function call expression found for '${fn}' on ${source}!`);
}

function methodCallExpression(fn, source, params) {
    if(fn.toLowerCase() === 'oclisundefined') {
        return new Expression.OclIsUndefinedExpression(source);
    }

    return new Expression.NativeJsFunctionCallExpression(source, fn, params);
}
