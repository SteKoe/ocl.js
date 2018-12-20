# Collection
## AnyExpression
Returns the first element that validates the given expression.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   any(expr : OclExpression) : T
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->any(i < 2)
   ```
   {% endtab %}
{% endtabs %}
## AppendExpression
Appends the given element to the given collection and returns the extended collection.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   append(elem : T) : Collection<T>
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->append("string")
   ```
   {% endtab %}
{% endtabs %}
## AsSetExpression
Returns the given collection as set, containing unique entries.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   asSet() : Collection
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->asSet()
   ```
   {% endtab %}
{% endtabs %}
## AtExpression
Returns the element of the collection at index index.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   at(index : Number) : T
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->at(2)
   ```
   {% endtab %}
{% endtabs %}
## CollectExpression
> 
> When we want to specify a collection that is derived from some other collection, but which contains different
> objects from the original collection (i.e., it is not a sub-collection), we can use a collect operation.
> The collect operation uses the same syntax as the select and reject.
> 
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   collect(expr : OclExpression) : Collection
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.children->collect(age)
   ```
   {% endtab %}
{% endtabs %}
## ExistsExpression
Operation which checks whether a collection contains an element specified by expr.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   exists(expr : OclExpression) : Boolean
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->exists(i | i < 2)
   ```
   {% endtab %}
{% endtabs %}
## FirstExpression
Returns the first element of the collection.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   collection->first() : T
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->first()
   ```
   {% endtab %}
{% endtabs %}
## ForAllExpression
> 
> Many times a constraint is needed on all elements of a collection.
> The forAll operation in OCL allows specifying a Boolean expression, which must hold for all objects in a collection.
> 
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   forAll(expr : oclExpression)
   ```
   {% endtab %}
{% endtabs %}
## IsEmptyExpression
Returns true if self is empty, false otherwise.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   isEmpty() : Boolean
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.cars->isEmpty()
   ```
   {% endtab %}
{% endtabs %}
## IsUniqueExpression
Returns true if the given expr evaluated on the body returns only different values.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   isUnique(expr : oclExpression) : boolean
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->isUnique(self > 3)
   ```
   {% endtab %}
{% endtabs %}
## LastExpression
Returns the last element of the collection.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   last() : T
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->last()
   ```
   {% endtab %}
{% endtabs %}
## NotEmptyExpression
Returns true if self is not empty, false otherwise.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   notEmpty() : Boolean
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.cars->notEmpty()
   ```
   {% endtab %}
{% endtabs %}
## OneExpression
Returns true of there is exactly one element matching the given expression, false otherwise.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   one(expr : oclExpression) : boolean
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->one(age < 18)
   ```
   {% endtab %}
{% endtabs %}
## RejectExpression
> 
> The reject operation specifies a subset of a collection.
> A reject is an operation on a collection and is specified using the arrow-syntax.
> This results in a collection that removes all the elements from collection for which the boolean-expression evaluates to true.
> To find the result of this expression, for each element in collection the expression boolean-expression is evaluated.
> If this evaluates to true, the element is excluded in the result collection, otherwise not.
> 
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   reject(expr : oclExpression) : Collection
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.customer->reject(underage)
   ```
   {% endtab %}
{% endtabs %}
## SelectExpression
> 
> The select operation specifies a subset of a collection.
> A select is an operation on a collection and is specified using the arrow-syntax.
> This results in a collection that contains all the elements from collection for which the boolean-expression evaluates to true.
> To find the result of this expression, for each element in collection the expression boolean-expression is evaluated.
> If this evaluates to true, the element is included in the result collection, otherwise not.
> 
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   select(expr : oclExpression) : Collection
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->select(item | item.name = "random")
   ```
   {% endtab %}
{% endtabs %}
## SizeExpression
Returns the size of the given collection.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   size() : Number
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->size()
   ```
   {% endtab %}
{% endtabs %}
## SumExpression
Returns the sum of all elements contained in self if they support the &#x27;+&#x27; operation.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   sum() : Number
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.jobs.salary->sum()
   ```
   {% endtab %}
{% endtabs %}
## UnionExpression
Returns a collection containing all elements of self and all elements of the passed in collection.
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   union(c : Collection) : Collection
   ```
   {% endtab %}
   {% tab title="Example" %}
   ```ocl
   self.collection->union(self.anotherCollection)
   ```
   {% endtab %}
{% endtabs %}

