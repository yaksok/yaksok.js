%noassoc EQ GT LT NE GTEQ LTEQ

%start ast
%%

NEWLINES
    : NEWLINES NEWLINE
    | NEWLINE
    | INDENT empty_or_newlines DEDENT
    ;

empty_or_newlines
    :
    | NEWLINES
    ;

empty_or_whitespace
    :
    | WS
    ;

ast
    : START_AST statements              { return new yy.ast.YaksokRoot($statements) }
    | START_DESCRIPTION description     { return $description }
    ;

statements
    : empty_or_newlines statement_list empty_or_newlines    { $$ = $statement_list }
    ;

statement_list
    : statement_list statement          { $1.push($statement); $$ = $1 }
    | statement                         { $$ = new yy.ast.Statements(); $$.push($statement) }
    ;

statement
    : assign_statement                  { $$ = $1 }
    | outside_statement                 { $$ = $1 }
    | call                              { $$ = new yy.ast.PlainStatement($1) }
    | if_else_statement                 { $$ = $1 }
    | loop_statement                    { $$ = $1 }
    | loop_end_statement                { $$ = $1 }
    | yaksok_statement                  { $$ = $1 }
    | yaksok_end_statement              { $$ = $1 }
    | translate_statement               { $$ = $1 }
    ;

assign_statement
    : lvalue ASSIGN call empty_or_newlines  { $$ = new yy.ast.Assign($lvalue, $call) }
    ;

outside_statement
    : OUTSIDE name empty_or_newlines    { $$ = new yy.ast.Outside($name) }
    ;

call
    : bind                                          { $$ = $1 }
    | expressions empty_or_newlines                 { $$ = yy.parseCall($expressions) }
    | ATMARK name expressions empty_or_newlines     { $$ = new yy.ast.ModuleCall($name, $expressions) }
    ;

bind
    : BIND bexpressions                 { $$ = new yy.ast.CallBind($bexpressions) }
    | BIND ATMARK name bexpressions     { $$ = new yy.ast.ModuleCallBind($name, $bexpressions) }
    ;

bexpressions
    : bexpressions bexpression          { $1.push($2); $$ = $1 }
    | bexpression                       { $$ = new yy.ast.Expressions(); $$.push($1) }
    ;

bexpression
    : expression                        { $$ = $1 }
    | QUESTION                          { $$ = new yy.ast.Question() }
    ;

block
    : empty_or_newlines INDENT statements DEDENT    { $$ = $statements }
    ;

if_statement
    : IF expression THEN block          { $$ = new yy.ast.If($expression, $block, null) }
    ;

if_else_statement
    : if_statement ELSE block                   { $1.elseBlock = $3; $$ = $1 }
    | if_statement ELSE if_else_statement       { $1.elseBlock = yy.stmts($3); $$ = $1 }
    | if_statement ELSEAND if_else_statement    { $1.elseBlock = yy.stmts($3); $$ = $1 }
    | if_statement                              { $$ = $1 }
    ;

loop_statement
    : LOOP block                            { $$ = new yy.ast.Loop($block) }
    | LOOP expression EUI name MADA block   { $$ = new yy.ast.Iterate($expression, $name, $block) }
    ;

loop_end_statement
    : LOOP END_BLOCK                    { $$ = new yy.ast.LoopEnd() }
    ;

yaksok_statement
    : YAKSOK WS description block       { $$ = new yy.ast.Yaksok($description, $block) }
    ;

yaksok_end_statement
    : YAKSOK empty_or_whitespace END_BLOCK  { $$ = new yy.ast.YaksokEnd() }
    ;

translate_statement
    : TRANSLATE translate_target WS description empty_or_newlines SPECIALBLOCK empty_or_newlines {
        $$ = new yy.ast.Translate($description, $translate_target, $SPECIALBLOCK);
    }
    ;

translate_target
    : LPAR empty_or_whitespace IDENTIFIER empty_or_whitespace RPAR  { $$ = $IDENTIFIER }
    ;

description
    : raw_description                   { $$ = yy.postprocessDescription($raw_description) }
    ;

raw_description
    : raw_description description_item  { $1.push($2); $$ = $1 }
    | description_item                  { $$ = new yy.ast.Description(); $$.push($1) }
    ;

description_item
    : description_parameter             { $$ = $1 }
    | description_name                  { $$ = $1 }
    | WS                                { $$ = null }
    ;

description_parameter
    : LPAR empty_or_whitespace IDENTIFIER empty_or_whitespace RPAR {
        $$ = new yy.ast.DescriptionParameter($IDENTIFIER);
    }
    ;

description_name
    : description_name DIV IDENTIFIER {
        $description_name.push($IDENTIFIER); $$ = $description_name;
    }
    | IDENTIFIER {
        $$ = new yy.ast.DescriptionName(); $$.push($IDENTIFIER);
    }
    ;

expressions
    : expressions expression            { $1.push($2); $$ = $1 }
    | expression                        { $$ = new yy.ast.Expressions(); $$.push($1) }
    ;

expression
    : or_expression                     { $$ = $1 }
    ;

or_expression
    : or_expression OR and_expression   { $$ = new yy.Or($1, $3) }
    | and_expression                    { $$ = $1 }
    ;

and_expression
    : and_expression AND logical_expression     { $$ = new yy.And($1, $3) }
    | logical_expression                        { $$ = $1 }
    ;

logical_expression
    : additive_expression EQ additive_expression    { $$ = new yy.ast.Equal($1, $3) }
    | additive_expression NE additive_expression    { $$ = new yy.ast.NotEqual($1, $3) }
    | additive_expression GT additive_expression    { $$ = new yy.ast.GreaterThan($1, $3) }
    | additive_expression LT additive_expression    { $$ = new yy.ast.LessThan($1, $3) }
    | additive_expression GTEQ additive_expression  { $$ = new yy.ast.GreaterThanEqual($1, $3) }
    | additive_expression LTEQ additive_expression  { $$ = new yy.ast.LessThanEqual($1, $3) }
    | additive_expression                           { $$ = $1 }
    ;

additive_expression
    : additive_expression PLUS multiplicative_expression    { $$ = new yy.ast.Plus($1, $3) }
    | additive_expression MINUS multiplicative_expression   { $$ = new yy.ast.Minus($1, $3) }
    | multiplicative_expression                             { $$ = $1 }
    ;

multiplicative_expression
    : multiplicative_expression MULT primary_expression     { $$ = new yy.ast.Multiply($1, $3) }
    | multiplicative_expression DIV primary_expression      { $$ = new yy.ast.Divide($1, $3) }
    | multiplicative_expression MOD primary_expression      { $$ = new yy.ast.Modular($1, $3) }
    | primary_expression                                    { $$ = $1 }
    ;

primary_expression
    : STRING                            { $$ = new yy.ast.String(yy.parseString($1)) }
    | TRUE                              { $$ = new yy.ast.Boolean(true) }
    | FALSE                             { $$ = new yy.ast.Boolean(false) }
    | NUMBER                            { $$ = $1 }
    | RANGE                             { $$ = $1 }
    | LIST                              { $$ = $1 }
    | DICT                              { $$ = $1 }
    | lvalue                            { $$ = $1 }
    | LPAR RPAR                         { $$ = new yy.ast.Void() }
    | LPAR call RPAR                    { $$ = $call }
    ;

lvalue
    : name                              { $$ = $1 }
    | access_expression                 { $$ = $1 }
    ;

access_expression
    : primary_expression LSQUARE expression RSQUARE     { $$ = new yy.ast.Access($1, $3) }
    | primary_expression DOT name                       { $$ = new yy.ast.DotAccess($1, $3) }
    ;

name
    : IDENTIFIER                        { $$ = new yy.ast.Name($1) }
    ;

NUMBER
    : INTEGER                           { $$ = new yy.ast.Integer(yy.parseInteger($1)) }
    | FLOAT                             { $$ = new yy.ast.Float(yy.parseFloat($1)) }
    ;

RANGE
    : additive_expression TILDE additive_expression     { $$ = new yy.ast.Range($1, $3) }
    ;

LIST
    : LSQUARE RSQUARE                   { $$ = new yy.ast.List() }
    | LSQUARE list_items RSQUARE        { $$ = $list_items }
    | LSQUARE list_items COMMA RSQUARE  { $$ = $list_items }
    ;

list_items
    : list_items COMMA expression       { $1.push($3); $$ = $1 }
    | expression                        { $$ = new yy.ast.List(); $$.push($1) }
    ;

DICT
    : LCURLY RCURLY                         { $$ = new yy.ast.Dict() }
    | LCURLY dict_key_values RCURLY         { $$ = $dict_key_values }
    | LCURLY dict_key_values COMMA RCURLY   { $$ = $dict_key_values }
    ;

dict_key_values
    : dict_key_values COMMA dict_key_value  { $1.push($3); $$ = $1 }
    | dict_key_value                        { $$ = new yy.ast.Dict(); $$.push($1) }
    ;

dict_key_value
    : name ASSIGN expression            { $$ = new yy.ast.DictKeyValue($name, $expression) }
    ;
