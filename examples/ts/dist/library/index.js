"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ocl_js_1 = require("@stekoe/ocl.js");
var oclEngine = ocl_js_1.default.create();
oclEngine.addOclExpression('context Object inv: true = true');
var oclResult = oclEngine.evaluate({});
if (!oclResult.getResult()) {
    throw new Error('expected result to be true.');
}
else {
    console.log([
        'The following result was returned:',
        "    Actual result:             " + oclResult.getResult() + " should be true",
        "    Evaluated contexts count:  " + oclResult.getEvaluatedContexts().length + " should be 1"
    ].join('\n'));
}
//# sourceMappingURL=index.js.map