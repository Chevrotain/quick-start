# Overview

This is the typescript based starter pack npm module to develop a parser/serializer for a language using [Chevortain](https://sap.github.io/chevrotain/docs/)
parser toolkit.

It bootstraps following constructs for a super simple sql dsl used in the [Chevrotain Tutorial](https://sap.github.io/chevrotain/docs/tutorial/step0_introduction.html)

- Lexer
- Parser
- Visitor
- Serializer
- Models
- Grammar Railroad diagram generation
- Jest based unit tests

## Usage

- clone this repo

```
git clone https://github.com/Chevrotain/quick-start.git chevrotain-quick-start
```

- Change the package name and other things as appropriate in the `package.json`

- Install dependencies

```
yarn install
```

- Start implementing your language.

## Unit Tests

Unit tests are a must when you are developing a new language. As you modify grammar, you want to make sure that new grammar is
handling all use cases properly. This quick-starter comes with easy to use unit testing based on Jest.

To add tests, edit the `dsl-texts.ts` file with new dsl text, model it supposed to parse into and text after
serializing using couple of format options.

To run a single test, just add `only: true` property to that entry. This allows you to debug to fix issues.

## Resources

Here are some resources to help with your language development

- [Chevrotain Docs](https://sap.github.io/chevrotain/docs/)
- [Chevrotain Chat](https://gitter.im/chevrotain-parser/Lobby)
- [Chevrotain Apis](https://sap.github.io/chevrotain/documentation/7_0_1/globals.html)

Here are some projects using Chevrotain in real world

- [Soql Parser](https://github.com/paustint/soql-parser-js)
- [Prettier Java Plugin Parser][sample_prettier_java]
- [JHipster Domain Language][sample_jhipster]
- [Metabase BI expression Parser][sample_metabase].
- [Three.js VRML Parser][sample_threejs]
- [Argdown Parser][sample_argdown]
- [Stardog Union Parsers (GraphQL/SPARQL/and more...)][sample_stardog]
- [Bombadil Toml Parser][sample_bombadil]
- [Eve Interactive Programing Language Parser][sample_eve].
- [BioModelAnalyzer's ChatBot Parser][sample_biomodel].

[benchmark]: https://sap.github.io/chevrotain/performance/
[sample_metabase]: https://github.com/metabase/metabase/blob/136dfb17954f4e4302b3bf2fee99ff7b7b12fd7c/frontend/src/metabase/lib/expressions/parser.js
[sample_jhipster]: https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/jdl_parser.js
[sample_eve]: https://github.com/witheve/Eve/blob/master/src/parser/parser.ts
[sample_biomodel]: https://github.com/Microsoft/BioModelAnalyzer/blob/master/ChatBot/src/NLParser/NLParser.ts
[sample_bombadil]: https://github.com/sgarciac/bombadil/blob/master/src/parser.ts
[sample_argdown]: https://github.com/christianvoigt/argdown/blob/master/packages/argdown-core/src/parser.ts
[sample_threejs]: https://github.com/mrdoob/three.js/blob/dev/examples/js/loaders/VRMLLoader.js
[sample_prettier_java]: https://github.com/jhipster/prettier-java/tree/master/packages/java-parser/src/productions
[sample_stardog]: https://github.com/stardog-union/millan/tree/master/src
[languages]: https://github.com/SAP/chevrotain/tree/master/examples/implementation_languages
[backtracking]: https://github.com/SAP/chevrotain/blob/master/examples/parser/backtracking/backtracking.js
[custom_apis]: https://sap.github.io/chevrotain/docs/guide/custom_apis.html
