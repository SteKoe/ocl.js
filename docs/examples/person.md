# Person


{% tabs %}
{% tab title="Context" %}
```typescript
class Person {
    name : String;
    age : Number;
    children : Person[];
    isMarried : Boolean;
    husband : Person;
    wife : Person;
}
```
{% endtab %}

{% tab title="Implemenation" %}
```javascript
import OCLEngine from "@stekoe/ocl.js"

const oclEngine = new OclEngine();

oclEngine.addOclExpression(`
    -- Check that underage persons are not married
    context Person inv:
        age < 18 implies isMarried = false
    
    -- Check that each and every children is younger than 18 years old
    context Person inv:
        children->select(age >= 18)->isEmpty()
    
    -- If a person is married, wife or husband has to be at least 18 years old
    context Person inv:
        self.wife->notEmpty() implies self.wife.age >= 18 and
        self.husband->notEmpty() implies self.husband.age >= 18
    
    -- If there are children, one should be named Stephan ;)
    context Person inv:
        self.children->exists(child | child.name = 'Stephan')
`);

let person = new Person();
oclEngine.evaluate(person);
```
{% endtab %}
{% endtabs %}