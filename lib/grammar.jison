/* lexical grammar */
%lex
NAME                                [a-zA-Z][a-zA-Z0-9]*
NUMBER                              [0-9]+

%%
\s+                                 /* ignore */
"context"                           return 'CONTEXT'
"and"                               return 'AND'
"or"                                return 'OR'
"xor"                               return 'XOR'
"nil"                               return 'NIL'
"("                                 return '('
\"([^\"]*)\"          	            return 'STRING'
{NUMBER}                            return 'NUMBER'
"true"                              return 'BOOLEAN'
"false"                             return 'BOOLEAN'
")"                                 return ')'
"."                                 return '.'
"implies"                           return 'IMPLIES'
":"                                 return ':'
"->"                                return '->'
"forAll"                            return 'COLLECTOR'
"select"                            return 'COLLECTOR'
"exists"                            return 'COLLECTOR'
"union"                             return 'SEQOPERATION'
"first"                             return 'SEQOPERATION'
"last"                              return 'SEQOPERATION'
"at"                                return 'SEQOPERATION'
"size"                              return 'FUNCTIONCALL'
"isEmpty"                           return 'FUNCTIONCALL'
"isNotEmpty"                        return 'FUNCTIONCALL'
"<="                                return 'OPERATIONNAME'
">="                                return 'OPERATIONNAME'
"="                                 return 'OPERATIONNAME'
"<>"                                return 'OPERATIONNAME'
"<"                                 return 'OPERATIONNAME'
">"                                 return 'OPERATIONNAME'
"let"                               return 'LET'
"inv"                               return 'INV'
"def"                               return 'DEF'
{NAME}(','\s*{NAME})*\s*"|"         return 'DECLARATOR'
{NAME}('.'{NAME})*                  return 'DOTTEDPATHNAME'
<<EOF>>               	            return 'EOF'
.                                   return 'ERROR'

/lex

/* operator associations and precedence */
%left "IMPLIES"
%left "AND" "OR" "XOR"
%left "OPERATIONNAME"

%start constraint
%% /* language grammar */

context
    : "CONTEXT" "DOTTEDPATHNAME"
        { $$=$2; }
    ;

constraint
    : context expression EOF
        {{
            return new ContextExpression($1, $2);
        }}
    ;

expression
    : "INV" ":" oclExpression
        { $$ = new InvariantExpression($3) }
    | "INV" "DOTTEDPATHNAME" ":" oclExpression
        { $$ = new InvariantExpression($4, $2) }
    | "DEF" ":" letExpression
        { $$=$3 }
    | expression expression
        {{
            if($2.map) {
                $$ = $2.push($1)
            } else {
                $$ = [$1, $2];
            }
        }}
    ;

letExpression
    : "LET" "DOTTEDPATHNAME" ":" oclExpression
        { $$=new LetExpression($2, $4) }
    | "DOTTEDPATHNAME" ":" oclExpression
        { $$=new LetExpression($1, $3) }
    ;

oclExpression
    : oclExpression "AND" oclExpression
        { $$=new AndExpression($1, $3) }
    | oclExpression "OR" oclExpression
        { $$=new OrExpression($1, $3) }
    | oclExpression "XOR" oclExpression
            { $$=new XorExpression($1, $3) }
    | oclExpression "OPERATIONNAME" oclExpression
        { $$=new OperationCallExpression($2, $1, $3) }
    | oclExpression "->" "SEQOPERATION" "(" oclExpression ")"
        { $$=sequenceOperationCall($3, $1, $5) }
    | oclExpression "->" "COLLECTOR" "(" "DECLARATOR" oclExpression ")"
        { var declarators = $5.replace('|','').split(',').map(s => s.trim()); $$=iteratorCallExpression($3, $1, declarators, $6) }
    | oclExpression "." "FUNCTIONCALL" "(" ")"
        { $$=functionCallExpression($3, $1) }
    | oclExpression "->" "FUNCTIONCALL"
        { $$=functionCallExpression($3, $1) }
    | oclExpression "->" "FUNCTIONCALL" "(" ")"
        { $$=functionCallExpression($3, $1) }
    | '(' oclExpression ')'
        { $$=$2 }
    | DOTTEDPATHNAME
        { $$=new VariableExpression($1) }
    | NUMBER
        { $$=new NumberExpression($1) }
    | NIL
        { $$=new NilExpression($1) }
    | STRING
        { $$=new StringExpression(JSON.parse($1)) }
    | BOOLEAN
         { $$=new BooleanExpression($1) }
    | oclExpression "IMPLIES" oclExpression
        { $$=new ImpliesExpression($1,$3) }
    ;

%%
function sequenceOperationCall(fn, source, body) {
    if(fn.toLowerCase() === 'union') {
        return new UnionOperation(source, body);
    } else if(fn.toLowerCase() === 'first') {
        return new FirstOperation(source);
    } else if(fn.toLowerCase() === 'at') {
        return new AOperation(source, body);
    } else if(fn.toLowerCase() === 'last') {
        return new LastOperation(source);
    }

    throw new Error(`Function with name '${fn}' not found!`);
}

function functionCallExpression(fn, param) {
    if(fn.toLowerCase() === 'isempty') {
        return new IsEmptyExpression(param);
    } else if(fn.toLowerCase() === 'isnotempty') {
        return new IsNotEmptyExpression(param);
    } else if(fn.toLowerCase() === 'size') {
        return new SizeExpression(param);
    }

    throw new Error(`Function with name '${fn}' not found!`);
}

function iteratorCallExpression(fn, source, declarators, param) {
    if(fn.toLowerCase() === 'forall') {
        return new IteratorExpression(source, declarators, param);
    } else if(fn.toLowerCase() === 'select') {
        return new SelectExpression(source, declarators, param);
    } else if(fn.toLowerCase() === 'exists') {
        return new ExistsExpression(source, declarators, param);
    }

    throw new Error(`Collector with name '${fn}' not found!`);
}