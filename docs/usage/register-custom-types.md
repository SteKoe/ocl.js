# Register custom types
Some of the expressions rely on `instanceof` call and hence check the actual type of the passed object.
The language build-in types are already known to the OCL Engine: Array, Boolean, Function, Number, Object, String.

If you define a custom type (e.g. `Person`), it is possible to register it to the OCL Engine as well.
After you have registered your type, expressions like `oclIsKindOf` will work as expected since it is able to check the type hierarchy now.

```javascript
class Person {
    name : String;
    age : Number;
    children : Person[];
    isMarried : Boolean;
    husband : Person;
    wife : Person;
}

oclEngine.registerTypes({Person});
```
