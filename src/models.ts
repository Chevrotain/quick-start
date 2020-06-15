export enum ModelType {
  SelectStatement = 'SelectStatement',
  Expression = 'Expression',
  WhereClause = 'WhereClause',
  FromClause = 'FromClause',
  SelectClause = 'SelectClause',
}

export interface Model {
  type: ModelType;
}

export interface SelectStatement extends Model {
  type: ModelType.SelectStatement;
  select: SelectClause;
  from: FromClause;
  where?: WhereClause;
}

export interface SelectClause extends Model {
  type: ModelType.SelectClause;
  columns: string[];
}

export interface FromClause extends Model {
  type: ModelType.FromClause;
  table: string;
}

export interface WhereClause extends Model {
  type: ModelType.WhereClause;
  condition: Expression;
}

export enum RelationalOperator {
  '>' = '>',
  '=' = '=',
  '<' = '<',
}

export interface Expression extends Model {
  type: ModelType.Expression;
  lhs: string;
  operator?: RelationalOperator;
  rhs?: string;
}

export interface Expression {}

export interface FormatOptions {
  keywordsUpperCase?: boolean;
  newLineForClause?: boolean;
}

export const FORMAT_CLEAN: FormatOptions = {
  keywordsUpperCase: false,
  newLineForClause: false,
};

export const FORMAT_DEFAULT: FormatOptions = {
  keywordsUpperCase: true,
  newLineForClause: true,
};
