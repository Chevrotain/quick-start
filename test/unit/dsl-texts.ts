export interface TestDsl {
  name?: string;
  text: string;
  textClean?: string;
  textDefault?: string;
  model?: object;
  only?: boolean;
  invalid?: boolean;
  message?: string;
}

export const dslTexts: TestDsl[] = [
  {
    text: 'select id FROM account',
    textClean: 'select id from account',
    textDefault: `
SELECT id
FROM account
`,
    model: {
      type: 'SelectStatement',
      select: {type: 'SelectClause', columns: ['id']},
      from: {type: 'FromClause', table: 'account'},
    },
  },
  {
    text: 'select id from contact where age=40',
    textClean: 'select id from contact where age = 40',
    textDefault: `
SELECT id
FROM contact
WHERE age = 40
`,
    model: {
      type: 'SelectStatement',
      select: {type: 'SelectClause', columns: ['id']},
      from: {type: 'FromClause', table: 'contact'},
      where: {type: 'WhereClause', condition: {type: 'Expression', lhs: 'age', operator: '=', rhs: '40'}},
    },
  },
  {
    text: 'select id from contact where age = other_age',
    model: {
      type: 'SelectStatement',
      select: {type: 'SelectClause', columns: ['id']},
      from: {type: 'FromClause', table: 'contact'},
      where: {type: 'WhereClause', condition: {type: 'Expression', lhs: 'age', operator: '=', rhs: 'other_age'}},
    },
  },
  {
    invalid: true,
    text: 'select id from',
    message: "[MismatchedTokenException] Expecting token of type --> Identifier <-- but found --> '' <--",
  },
];
