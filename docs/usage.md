# Usage
## Installation 
OCL.js is entirely written in JavaScript and served either via npm or GitHub. 
It is designed to run either in a node environment or in the browser.

To add OCL.js to your project install it via npm as follows and you are good to go:

```bash
$ npm install @stekoe/ocl.js --save
```

As alternative, you can also download the ocl.min.js file from GitHub and include that to your code.

## Use the library
When adding OCL.js via npm, you can start using it via importing the OCLEngine that is provided by “@stekoe/ocl.js”.

```javascript
import OCLEngine from "@stekoe/ocl.js"
// Or of you prefer require:
// const OCLEngine = require('@stekoe/ocl.js');

const myOclExpression = `
    context Person
        inv: self.parents->forAll(p | p <> self)
`;

// Instantiate the OclEngine here
const oclEngine = new OclEngine();

// Add your first OCL expression here
oclEngine.addOclExpression(myOclExpression);

// Evaluate an object obj against all know OCL expressions
const oclResult = oclEngine.evaluate(obj);
```

The resulting `oclResult` object contains three fields: 
1. `result` contains the actual result of the evaluation run as a boolean value 
1. `namesOfFailedInvs` contains the names of failed invariants or `anonymous` if none has been provided
1. `evaluatedContexts` contains all `ContextExpressions` that have been evaluated 