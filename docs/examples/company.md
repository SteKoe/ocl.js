# Company


{% tabs %}
{% tab title="Context" %}
```typescript
class Company {
    name : String;
    employee: Person[]
}

class Person {
    name : String;
    age : Number;
    isMarried : Boolean;
}
```
{% endtab %}

{% tab title="Implemenation" %}
```javascript
import OCLEngine from "@stekoe/ocl.js"

const oclEngine = new OclEngine();

oclEngine.addOclExpression(`
    -- No one should work that long...
    context Company inv:
        self.employee->forAll(p : Person | p.age <= 65 )
    
    -- We only accept a company as valid if every employee is married
    context Company inv:
        self.employee->reject(p | p.isMarried )->isEmpty()
`);

let company = new Company();
company.employee.push(new Person());

oclEngine.evaluate(company);
```
{% endtab %}
{% endtabs %}