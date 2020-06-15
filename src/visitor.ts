import { parse, parser } from "./parser";
import {
  AtomicExpressionNode,
  ExpressionNode,
  FromClauseNode,
  RelationalOperatorNode,
  SelectClauseNode,
  SelectStatementNode,
  WhereClauseNode,
} from "./nodes";
import {
  Expression,
  FromClause,
  ModelType,
  RelationalOperator,
  SelectClause,
  SelectStatement,
  WhereClause,
} from "./models";

class SqlAstBuilderVisitor extends parser.getBaseCstVisitorConstructor() {
  constructor() {
    super();
    this.validateVisitor();
  }

  selectStatement(node: SelectStatementNode): SelectStatement {
    // "this.visit" can be used to visit none-terminals and will invoke the correct visit method for the CstNode passed.
    const select = this.visit(node.selectClause);

    //  "this.visit" can work on either a CstNode or an Array of CstNodes.
    //  If an array is passed (node.fromClause is an array) it is equivalent
    //  to passing the first element of that array
    const from = this.visit(node.fromClause);

    // "whereClause" is optional, "this.visit" will ignore empty arrays (optional)
    const where = node.whereClause ? this.visit(node.whereClause) : undefined;

    return {
      type: ModelType.SelectStatement,
      select: select,
      from: from,
      where: where,
    };
  }

  selectClause(node: SelectClauseNode): SelectClause {
    // Each Terminal or Non-Terminal in a grammar rule are collected into
    // an array with the same name(key) in the ctx object.
    let columns = node.columns.map((column) => column.image);

    return {
      type: ModelType.SelectClause,
      columns: columns,
    };
  }

  fromClause(node: FromClauseNode): FromClause {
    return {
      type: ModelType.FromClause,
      table: node.table[0].image,
    };
  }

  whereClause(ctx: WhereClauseNode): WhereClause {
    return {
      type: ModelType.WhereClause,
      condition: this.visit(ctx.expression),
    };
  }

  expression(ctx: ExpressionNode): Expression {
    // Note the usage of the "rhs" and "lhs" labels defined in step 2 in the expression rule.
    const lhs = this.visit(ctx.lhs[0]);
    const operator = this.visit(ctx.relationalOperator);
    const rhs = this.visit(ctx.rhs[0]);

    return {
      type: ModelType.Expression,
      lhs: lhs,
      operator: operator,
      rhs: rhs,
    };
  }

  // these two visitor methods will return a string.
  atomicExpression(ctx: AtomicExpressionNode): string {
    if (ctx.Integer) {
      return ctx.Integer[0].image;
    } else {
      return ctx.Identifier!![0].image;
    }
  }

  relationalOperator(ctx: RelationalOperatorNode): RelationalOperator {
    let operator;
    if (ctx.GreaterThan) {
      operator = ctx.GreaterThan[0].image;
    } else if (ctx.Equals) {
      operator = ctx.Equals[0].image;
    } else {
      operator = ctx.LessThan!![0].image;
    }

    return operator as RelationalOperator;
  }
}

// Our visitor has no state, so a single instance is sufficient.
const astBuilder = new SqlAstBuilderVisitor();

export function buildAst(text: string) {
  const cst = parse(text);
  const ast = astBuilder.visit(cst);
  return ast;
}
