/* lexical grammar */
%lex

%%
\s+                                 /* ignore */
"context"                           return 'context'
"inv"                               return 'inv'
"true"                              return 'true'
"false"                             return 'false'
"and"                               return 'and'
"or"                                return 'or'
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
"@"                                 return '@'
"pre"                               return 'pre'

'nil'                               return 'nil'
[a-zA-Z][a-zA-Z0-9]*                return 'simpleName'
["][^\"]*["]          	            return 'string'
[0-9][0-9]*                         return 'integer'
[0-9][0-9]+\.[0-9]*                 return 'real'

<<EOF>>               	            return 'EOF'
.                                   return 'ERROR'

/lex

/* operator associations and precedence */
%left "and" "or" "xor"

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
	: 'context' pathName invOrDef
	    { $$ = new ContextExpression($2, $3) }
	;

invOrDef
	: 'inv' simpleNameOptional ':' oclExpression
	    { $$ = new InvariantExpression($4, $2) }
	;

oclExpression
	: pathName preOptional
	    { $$ = new VariableExpression($1) }
	| literalExp
	    { $$ = $1 }
    | oclExpression '.' simpleName preOptional
        { $$ = ($1 instanceof VariableExpression) ? new VariableExpression([$1.variable, $3].join('.')) : $1 }
	| oclExpression '<>' oclExpression
	    { $$ = new OperationCallExpression('<>', $1, $3) }
	| oclExpression '=' oclExpression
	    { $$ = new OperationCallExpression('=', $1, $3) }
    | oclExpression '->' simpleName
        { $$ = functionCallExpression($3, $$); }
    | oclExpression '(' variableDeclarationList '|' oclExpression ')'
        { $1.body = $5; $1.iterators = $3; $$ = $1 }
    | oclExpression 'implies' oclExpression
        { console.log($$); $$ = new ImpliesExpression($1, $3) }
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
%%
function createConstraint(stereoType, constraint) {
    if(stereoType === 'inv') {
        return new InvariantExpression(constraint);
    }
}

function sequenceOperationCall(fn, source, body) {
    if(fn.toLowerCase() === 'union') {
        return new UnionOperation(source, body);
    } else if(fn.toLowerCase() === 'first') {
        return new FirstOperation(source);
    } else if(fn.toLowerCase() === 'at') {
        return new AOperation(source, body);
    } else if(fn.toLowerCase() === 'last') {
        return new LastOperation(source);
    } else if(fn.toLowerCase() === 'asset') {
        return new AsSetOperation(source);
    }

    throw new Error(`SequenceOperationCall with name '${fn.toLowerCase()}' not found!`);
}

function functionCallExpression(fn, source) {
    console.log('functionCallExpression', fn, source);

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
    }

    throw new Error(`No function call expression found for '${fn}' not found!`);
}

function simplePropertyCall(operationName, optionalPre, optionalQualifiers, optionalPropertyCallParams) {
    const operations = ['<','<=','=', '=>', '>', '<>'];
    if(operations.indexOf(operationName) !== -1) {
    } else {
        return new VariableExpression(operationName);
    }
}