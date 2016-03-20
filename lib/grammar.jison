/* lexical grammar */
%lex
NAME                                [a-zA-Z][a-zA-Z0-9]*
NUMBER                              [0-9]+

%%
\s+                                 /* ignore */
"context"                           return 'CONTEXT'
"and"                               return 'AND'
"or"                                return 'OR'
"nil"                               return 'NIL'
"("                                 return '('
\"([^\"]*)\"          	            return 'STRING'
{NUMBER}                            return 'NUMBER'
"true"                              return 'BOOLEAN'
"false"                             return 'BOOLEAN'
")"                                 return ')'
"implies"                           return 'IMPLIES'
":"                                 return ':'
"->"                                return '->'
"forAll"                            return 'COLLECTOR'
"select"                            return 'COLLECTOR'
"exists"                            return 'COLLECTOR'
"isEmpty"                           return 'FUNCTIONCALL'
"isNotEmpty"                        return 'FUNCTIONCALL'
"<="                                return 'OPERATIONNAME'
">="                                return 'OPERATIONNAME'
"="                                return 'OPERATIONNAME'
"<>"                                return 'OPERATIONNAME'
"inv"                               return 'STEREOTYPE'
{NAME}(','\s*{NAME})*\s*"|"         return 'DECLARATOR'
{NAME}('.'{NAME})*                  return 'DOTTEDPATHNAME'
<<EOF>>               	            return 'EOF'
.                                   return 'ERROR'

/lex

/* operator associations and precedence */
%left "IMPLIES"
%left "AND" "OR"
%left "OPERATIONNAME"

%start constraint
%% /* language grammar */

constraint
    : context "STEREOTYPE" ':' oclExpression EOF
        {{
            var inner;
            if($2==='inv') {
                inner = new InvariantExpression($4);
            }

            $$ = new ContextExpression($1, inner);
            return $$;
        }}
    | context "STEREOTYPE" "DOTTEDPATHNAME" ':' oclExpression EOF
        {{
            var inner;
            if($2==='inv') {
                inner = new InvariantExpression($5, $3);
            }

            $$ = new ContextExpression($1, inner);
            return $$;
        }}
    ;

context
    : "CONTEXT" "DOTTEDPATHNAME"
        { $$=$2; }
    ;

oclExpression
    : oclExpression "AND" oclExpression
        { $$=new AndExpression($1, $3) }
    | oclExpression "OR" oclExpression
        { $$=new OrExpression($1, $3) }
    | oclExpression "OPERATIONNAME" oclExpression
        { $$=new OperationCallExpression($2, $1, $3) }
    | oclExpression "->" "COLLECTOR" "(" "DECLARATOR" oclExpression ")"
        { var declarators = $5.replace('|','').split(',').map(s => s.trim()); $$=iteratorCallExpression($3, $1, declarators, $6) }
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
    |
        { $$=[] }
    ;

%%
function functionCallExpression(fn, param) {
    if(fn.toLowerCase() === 'isempty') {
        return new IsEmptyExpression(param);
    } else if(fn.toLowerCase() === 'isnotempty') {
        return new IsNotEmptyExpression(param);
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