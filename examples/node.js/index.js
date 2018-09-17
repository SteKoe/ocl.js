const OclEngine = require('@stekoe/ocl.js');

const oclEngine = OclEngine.create();
oclEngine.addOclExpression(`context Object inv: true = true`);

const oclResult = oclEngine.evaluate({});

if (oclResult.getResult() === false) {
    throw new Error("expected result to be true.")
} else {
    console.log([
        `The following result was returned:`,
        `    Actual result:             ${oclResult.getResult()}`,
        `    Evaluated contexts count:  ${oclResult.getEvaluatedContexts().length}`
    ].join('\n'))
}