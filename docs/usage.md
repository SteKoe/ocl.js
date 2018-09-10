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
oclEngine.evaluate(obj);
```

## Provide custom type detection function
When the discriminator for an object type is part of the given instance (e.g. a field called type) then it is possible to pass in a custom function which determines the actual type.

Let’s say you have a type as follows and you want to use the field _type as discriminator:

```javascript
class MyCustomType {
    constructor(type) {
        this._type = type;
    }
}
```

Then you can pass in a callback into the setTypeDeterminer function to override the default behavior:

```javascript
import OCLEngine from "@stekoe/ocl.js"

const oclEngine = new OclEngine();
oclEngine.setTypeDeterminer(obj => obj._type);

const person = new MyCustomType('Person');
oclEngine.evaluate(person);
```

Whenever the OCL engine has to check the context, the custom function that is passed to `setTypeDeterminer`.
