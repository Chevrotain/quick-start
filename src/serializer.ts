import {
  FormatOptions,
  ModelType,
  SelectStatement,
  WhereClause,
  FORMAT_CLEAN,
  FromClause,
  Model,
  SelectClause,
} from './models';

export function isString(val: any): val is string {
  return typeof val === 'string';
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export class Serializer {
  private options: FormatOptions;

  constructor(options?: FormatOptions) {
    this.options = options || FORMAT_CLEAN;
  }

  private keyword(value: any) {
    return this.options.keywordsUpperCase ? value.toUpperCase() : value.toLowerCase();
  }

  private clauseStart(keyword: string) {
    return `${this.options.newLineForClause ? `\n` : ' '}${this.keyword(keyword)}`;
  }

  private mapEach<T>(input: any, handler?: (item: T) => string, separator?: string): string {
    return toArray(input)
      .map((item) => (handler ? handler(item) : this.serialize(item as Model)))
      .join(separator || ', ')
      .trim();
  }

  private selectStatement(model: SelectStatement): string {
    let value =
      `${this.clauseStart('select')} ${this.selectClause(model.select)}` +
      `${this.clauseStart('from')} ${this.fromClause(model.from)}`;

    value += model.where ? `${this.clauseStart('where')} ${this.whereClause(model.where)}` : '';

    return value.trim();
  }

  private selectClause(model: SelectClause) {
    return this.mapEach(model.columns);
  }

  private fromClause(model: FromClause) {
    return model.table;
  }

  private whereClause(model: WhereClause) {
    return `${model.condition.lhs} ${model.condition.operator} ${model.condition.rhs}`;
  }

  public serialize(model: Model): string {
    if (!model) {
      return '';
    }

    if (isString(model)) {
      return model as string;
    }

    switch (model.type) {
      case ModelType.SelectStatement:
        return this.selectStatement(model as SelectStatement);
      case ModelType.SelectClause:
        return this.selectClause(model as SelectClause);
      case ModelType.FromClause:
        return this.fromClause(model as FromClause);
      case ModelType.WhereClause:
        return this.whereClause(model as WhereClause);
    }

    return '';
  }
}

export function serialize(model: Model, options?: FormatOptions): string {
  const serializer = new Serializer(options || FORMAT_CLEAN);
  return serializer.serialize(model);
}
