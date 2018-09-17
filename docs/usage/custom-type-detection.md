# Provide custom type detection function
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
