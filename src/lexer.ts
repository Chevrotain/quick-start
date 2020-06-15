import {createToken, Lexer} from 'chevrotain';

export const Identifier = createToken({name: 'Identifier', pattern: /[a-zA-Z]\w*/});

// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/SAP/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
export const Select = createToken({
  name: 'Select',
  pattern: /SELECT/i,
  longer_alt: Identifier,
});

export const From = createToken({
  name: 'From',
  pattern: /FROM/i,
  longer_alt: Identifier,
});

export const Where = createToken({
  name: 'Where',
  pattern: /WHERE/i,
  longer_alt: Identifier,
});

export const Comma = createToken({name: 'Comma', pattern: /,/});

export const Integer = createToken({name: 'Integer', pattern: /0|[1-9]\d*/i});

export const GreaterThan = createToken({name: 'GreaterThan', pattern: />/});

export const Equals = createToken({name: 'Equals', pattern: /=/});

export const LessThan = createToken({name: 'LessThan', pattern: /</});

export const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

// note we are placing WhiteSpace first as it is very common thus it will speed up the lexer.
export const allTokens = [
  WhiteSpace,

  // "keywords" appear before the Identifier
  Select,
  From,
  Where,
  Comma,

  // The Identifier must appear after the keywords because all keywords are valid identifiers.
  Identifier,
  Integer,
  GreaterThan,
  Equals,
  LessThan,
];

export const SqlLexer = new Lexer(allTokens);

export function tokenize(text: string) {
  const result = SqlLexer.tokenize(text);

  if (result.errors.length > 0) {
    const msg = result.errors.map((error) => `[${error.line}:${error.column}] ${error.message}`).join(', ');
    throw new Error(`Error tokenizing the text. ${msg}`);
  }

  return result.tokens;
}
