import {CstParser} from 'chevrotain';

import {
  Integer,
  Comma,
  From,
  GreaterThan,
  Identifier,
  LessThan,
  Select,
  Where,
  WhiteSpace,
  Equals,
  tokenize,
  allTokens,
} from './lexer';

export class SqlParser extends CstParser {
  constructor(options?: any) {
    super(allTokens, options);
    this.performSelfAnalysis();
  }

  selectStatement = this.RULE('selectStatement', () => {
    this.SUBRULE(this.selectClause);
    this.SUBRULE(this.fromClause);
    this.OPTION(() => {
      this.SUBRULE(this.whereClause);
    });
  });

  private selectClause = this.RULE('selectClause', () => {
    this.CONSUME(Select);
    this.AT_LEAST_ONE_SEP({
      SEP: Comma,
      DEF: () => {
        this.CONSUME(Identifier, {LABEL: 'columns'});
      },
    });
  });

  private fromClause = this.RULE('fromClause', () => {
    this.CONSUME(From);
    this.CONSUME(Identifier, {LABEL: 'table'});
  });

  private whereClause = this.RULE('whereClause', () => {
    this.CONSUME(Where);
    this.SUBRULE(this.expression);
  });

  // The "rhs" and "lhs" (Right/Left Hand Side) labels will provide easy
  // to use names during CST Visitor (step 3a).
  private expression = this.RULE('expression', () => {
    this.SUBRULE(this.atomicExpression, {LABEL: 'lhs'});
    this.SUBRULE(this.relationalOperator);
    this.SUBRULE2(this.atomicExpression, {LABEL: 'rhs'}); // note the '2' suffix to distinguish
    // from the 'SUBRULE(atomicExpression)'
    // 2 lines above.
  });

  private atomicExpression = this.RULE('atomicExpression', () => {
    this.OR([{ALT: () => this.CONSUME(Integer)}, {ALT: () => this.CONSUME(Identifier)}]);
  });

  private relationalOperator = this.RULE('relationalOperator', () => {
    this.OR([
      {ALT: () => this.CONSUME(GreaterThan)},
      {ALT: () => this.CONSUME(LessThan)},
      {ALT: () => this.CONSUME(Equals)},
    ]);
  });
}

export const parser: SqlParser = new SqlParser();
export function parse(text: string) {
  // "input" is a setter which will reset the parser's state.
  parser.input = tokenize(text);
  const cst = parser.selectStatement();

  if (parser.errors.length > 0) {
    const msg = parser.errors.map((error) => `[${error.name}] ${error.message}`).join(', ');
    throw new Error(msg);
  }

  return cst;
}
