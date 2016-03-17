/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   	/* skip whitespace */
"context "[A-Za-z]+               return 'CONTEXT'
[0-9]+("."[0-9]+)?\b  	return 'NUMBER'
\"([^\"]+)\"          	return 'STRING'
"("                   	return '('
")"                   	return ')'
"or"                  	return 'OR'
"and"                 	return 'AND'
"implies"               return 'IMPLIES'
"->"                    return 'FUNCTIONCALL'
(\=)                    return 'OPERATIONCALL'
"inv:"                  return 'INV'
(true|false)            return 'BOOLEAN'
<<EOF>>               	return 'EOF'

"forAll"                return 'FORALL'
([a-zA-Z]+)"."([a-zA-Z]+)*   return 'DOTTEDVAR'
[a-zA-Z]+            	return 'VAR'
{int}{frac}?{exp}?\b 	return 'NUMBER'



/lex

/* operator associations and precedence */
%left 'ATTRIBUTE'
%left 'VAR'
%left 'IMPLIES'
%left 'AND'
%left 'OR'
%left 'OPERATIONCALL'
%left 'FUNCTIONCALL'


%start expressions

%% /* language grammar */

expressions
    : context EOF               { return $1; }
    ;

context
    : CONTEXT INV e             {{
                                    return {
                                        type: 'ContextExpression',
                                        targetType: $1.split(' ').pop(),
                                        inv: {
                                            type: 'InvariantExpression',
                                            definition: $3
                                        }
                                    }
                                }}
    ;

e
    : e '+' e                   { $$ = $1+$3 }
    | 'DOTTEDVAR'               {
                                  var v = $1.split('.')[0];
                                  var a = $1.split('.')[1];
                                  $$ = {
                                    type: 'AttributeCallExpression',
                                    variable: v,
                                    attribute: a
                                  }
                                }
    | '(' e ')'                 ->  $2
    | 'NUMBER'                  ->  Number(yytext)
    | 'STRING'                  ->  JSON.parse($1)
    | 'BOOLEAN'                 { var val = JSON.parse($1); $$ = {type: 'BooleanExpression', value: val} }
    | 'VAR'                     ->  { type: 'VariableExpression', variable: $1 }
    | 'ATTRIBUTE'               ->  $1
    | e 'OPERATIONCALL' e       ->  {type: 'OperationCallExpression', left: $1, operator: $2, right: $3}
    | e 'IMPLIES' e             ->  "ImpliesExpression(" + $1 + ", " + $3 + ")"
    | e 'OR' e                  ->  "OrExpression(" + $1 + "," + $3 + ")"
    | e 'AND' e                 ->  "AndExpression(" + $1 + "," + $3 + ")"
    | 'FUNCTIONCALL' fn         ->  "1: " + $2 + "sad" + $1
    ;

fn
    : 'FORALL'                  -> "forAll" + $1
	;