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
[a-zA-Z][a-zA-Z0-9]*                return 'simpleName'
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
	    { $$ = new ContextExpression($2, $3) }
	;

invOrDefList
    : invOrDefList invOrDef
        { $$ = $1.concat($2) }
    | invOrDef
        { $$ = [$1] }
    ;

invOrDef
	: 'inv' simpleNameOptional ':' oclExpression
	    { $$ = new InvariantExpression($4, $2) }
    | 'def' simpleNameOptional ':' defExpression
        { $$ = new LetExpression($2, $4) }
	;

oclExpression
	: pathName preOptional
	    { $$ = new VariableExpression($1) }
    | '(' oclExpression ')'
        { $$ = $2 }
    | oclExpression '.' simpleName preOptional
        { $$ = ($1 instanceof VariableExpression) ? new VariableExpression([$1.variable, $3].join('.')) : $1 }
    | oclExpression '+' oclExpression
        { $$ = new Math.AdditionExpression($1, $3) }
    | oclExpression '-' oclExpression
        { $$ = new Math.AdditionExpression($1, $3) }
    | oclExpression '*' oclExpression
        { $$ = new Math.MultiplyExpression($1, $3) }
    | oclExpression '/' oclExpression
        { $$ = new Math.DivideExpression($1, $3) }
    | oclExpression 'mod' oclExpression
        { $$ = new Math.ModuloExpression($1, $3) }
    | oclExpression 'div' oclExpression
        { $$ = new Math.DivideExpression($1, $3) }
    | oclExpression '<' oclExpression
        { $$ = new OperationCallExpression('<', $1, $3) }
    | oclExpression '<=' oclExpression
        { $$ = new OperationCallExpression('<=', $1, $3) }
	| oclExpression '=' oclExpression
	    { $$ = new OperationCallExpression('=', $1, $3) }
	| oclExpression '>=' oclExpression
	    { $$ = new OperationCallExpression('>=', $1, $3) }
	| oclExpression '>' oclExpression
	    { $$ = new OperationCallExpression('>', $1, $3) }
	| oclExpression '<>' oclExpression
	    { $$ = new OperationCallExpression('<>', $1, $3) }
    | oclExpression 'and' oclExpression
	    { $$ = new AndExpression($1, $3) }
    | oclExpression 'or' oclExpression
	    { $$ = new OrExpression($1, $3) }
    | oclExpression 'xor' oclExpression
	    { $$ = new XorExpression($1, $3) }
    | oclExpression '->' simpleName
        { $$ = functionCallExpression($3, $$); }
    | oclExpression '(' variableDeclarationList '|' oclExpression ')'
        { $1.body = $5; $1.iterators = $3; $$ = $1 }
    | oclExpression '(' oclExpression ')'
        { $1.body = $3; $$ = $1 }
    | oclExpression '(' ')'
        {  }
    | oclExpression 'implies' oclExpression
        { $$ = new ImpliesExpression($1, $3) }
	| literalExp
	    { $$ = $1 }
	;

defExpression
	: 'let' simpleName ':' oclExpression
	    { $$ = new LetExpression($2, $4) }
	| simpleName ':' oclExpression
	    { $$ = new LetExpression($1, $3) }
	;

type
	: pathName
	    { $$ = $1 }
	;

variableDeclaration
    : simpleName typeOptional
        { $$ = $1 }
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
	    { $$ = new NumberExpression($1) }
	| real
	    { $$ = new NumberExpression($1) }
	| string
	    { $$ = new StringExpression($1) }
	| 'true'
	    { $$ = new BooleanExpression(true) }
	| 'false'
	    { $$ = new BooleanExpression(false) }
    | 'nil'
        { $$ = new NilExpression() }
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
        return new IsEmptyExpression(source);
    } else if(fn.toLowerCase() === 'isnotempty') {
        return new IsNotEmptyExpression(source);
    } else if(fn.toLowerCase() === 'size') {
        return new SizeExpression(source);
    } else if(fn.toLowerCase() === 'forall') {
        return new IteratorExpression(source);
    } else if(fn.toLowerCase() === 'select') {
        return new SelectExpression(source);
    } else if(fn.toLowerCase() === 'exists') {
        return new ExistsExpression(source);
    } else if(fn.toLowerCase() === 'union') {
        return new UnionOperation(source);
    } else if(fn.toLowerCase() === 'first') {
        return new FirstOperation(source);
    } else if(fn.toLowerCase() === 'at') {
        return new AOperation(source);
    } else if(fn.toLowerCase() === 'last') {
        return new LastOperation(source);
    } else if(fn.toLowerCase() === 'asset') {
        return new AsSetOperation(source);
    }

   throw new Error(`No function call expression found for '${fn}' not found!`);
}
