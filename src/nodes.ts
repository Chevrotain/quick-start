import {CstNode, IToken} from 'chevrotain';

export interface SelectStatementNode {
  selectClause: CstNode[];
  fromClause: CstNode[];
  whereClause?: CstNode[];
}

export interface SelectClauseNode {
  columns: IToken[];
}

export interface FromClauseNode {
  table: IToken[];
}

export interface WhereClauseNode {
  expression: CstNode[];
}

export interface ExpressionNode {
  lhs: CstNode[];
  relationalOperator: CstNode[];
  rhs: CstNode[];
}

export interface AtomicExpressionNode {
  Integer?: IToken[];
  Identifier?: IToken[];
}

export interface RelationalOperatorNode {
  GreaterThan?: IToken[];
  LessThan?: IToken[];
  Equals?: IToken[];
}
