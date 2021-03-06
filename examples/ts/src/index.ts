import OclEngine from '@stekoe/ocl.js';

const oclEngine = OclEngine.create();
oclEngine.addOclExpression('context Object inv: true = true');

const oclResult = oclEngine.evaluate({});

if (!oclResult.getResult()) {
    throw new Error('expected result to be true.');
} else {
    console.log([
        'The following result was returned:',
        `    Actual result:             ${oclResult.getResult()} should be true`,
        `    Evaluated contexts count:  ${oclResult.getEvaluatedContexts().length} should be 1`
    ].join('\n'));
}
