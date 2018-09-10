# Register enumerations
Whenever the use of enumerations is necessary, the enumeration has to be registered to the OCL Engine in order to let it parse the correct values.

Registering an enumeration is possible via the function `registerEnum(name : string, values : object)`.
Let's assume one has defined an enumeration for `Gender`, it has to be registered to the OCL Engine as follows:

```javascript
const Gender = {
    FEMALE: 'female',
    MALE: 'male',
    OTHER: 'other'
} 

oclEngine.registerEnum('Gender', Gender);
```
