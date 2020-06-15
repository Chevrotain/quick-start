const path = require('path');
const fs = require('fs');
const chevrotain = require('chevrotain');

function generateDiagram() {
  const {parser} = require('../dist/parser');
  const serializedGrammar = parser.getSerializedGastProductions();
  const htmlText = chevrotain.createSyntaxDiagramsCode(serializedGrammar);
  const outPath = path.resolve(__dirname, '../dist');
  fs.writeFileSync(outPath + '/diagram.html', htmlText);

  return {
    message: `Diagram is written to ${outPath}`,
  };
}

generateDiagram();
