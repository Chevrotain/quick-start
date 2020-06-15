import {dslTexts} from './dsl-texts';
import {FORMAT_CLEAN, FORMAT_DEFAULT, parse, serialize} from '../../src';

describe('parser/serializer', () => {
  const only = dslTexts.filter((query) => query.only);

  (only.length === 0 ? dslTexts : only).forEach((query) => {
    if (query.invalid) {
      it(query.name || `invalid: ${query.text}`, () => {
        expect(() => parse(query.text)).toThrow(query.message);
      });
    } else {
      it(query.name || `valid: ${query.text}`, () => {
        const resp = parse(query.text);
        // console.log('####### model:', JSON.stringify(resp));

        if (query.model) {
          expect(resp).toEqual(query.model);
        }

        expect(serialize(resp)).toEqual(query.textClean || query.text);

        if (query.textDefault) {
          expect(serialize(resp, FORMAT_DEFAULT)).toEqual(query.textDefault.trim());
        }
      });
    }
  });
});
