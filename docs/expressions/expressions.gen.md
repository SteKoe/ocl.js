# Expressions
## DefExpression
> 
> The Let expression allows a variable to be used in one OCL expression.
> To enable reuse of variables/operations over multiple OCL expressions one can use a Constraint with the stereotype «definition», in which helper variables/operations are defined.
> This «definition» Constraint must be attached to a Classifier and may only contain variable and/or operation definitions, nothing else.
> All variables and operations defined in the «definition» constraint are known in the same context as where any property of the Classifier can be used.
> Such variables and operations are attributes and operations with stereotype «OclHelper» of the classifier.
> They are used in an OCL expression in exactly the same way as normal attributes or operations are used.
> The syntax of the attribute or operation definitions is similar to the Let expression, but each attribute and operation definition is prefixed with the keyword ‘def’ as shown below.
> 
{% tabs %}
   {% tab title="Example" %}
   ```ocl
   context Person def:
income : Integer = self.job.salary->sum()
   ```
   {% endtab %}
{% endtabs %}
## DeriveExpression
A derived value expression is an expression that may be linked to a property.
{% tabs %}
   {% tab title="Example" %}
   ```ocl
   context Person::income : Integer
derive:  if underAge
 then (parents.income->sum() * 1/100).round()
 else job.salary->sum()
endif
   ```
   {% endtab %}
{% endtabs %}
## EnumerationExpression
Resolves enumeration values.
{% tabs %}
{% endtabs %}
## IfExpression
The IfExpression allows to execute a statement if the given condition is truthy.
Otherwise the else part is taken.
{% tabs %}
{% endtabs %}
## InitExpression
{% tabs %}
{% endtabs %}
## InvariantExpression
> 
> The OCL expression can be part of an Invariant which is a Constraint stereotyped as an «invariant».
> When the invariant is associated with a Classifier, the latter is referred to as a “type” in this clause.
> An OCL expression is an invariant of the type and must be true for all instances of that type at any time.
> (Note that all OCL expressions that express invariants are of the type Boolean.)
> 
{% tabs %}
   {% tab title="Example" %}
   ```ocl
   context Person inv:
self.age > 0
   ```
   {% endtab %}
{% endtabs %}
## NativeJsFunctionCallExpression
{% tabs %}
{% endtabs %}
## OclIsKindOfExpression
Checks if *self* is an instance of the class identified by the name
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   oclIsKindOf(type : T) : Boolean
   ```
   {% endtab %}
{% endtabs %}
## OclIsTypeOfExpression
Checks if *self* is an instance of exact the class identified by the name
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   oclIsTypeOf(s : String) : Boolean
   ```
   {% endtab %}
{% endtabs %}
## OclIsUndefinedExpression
Checks if *self* is not defined
{% tabs %}
   {% tab title="Definition" %}
   ```ocl
   oclIsUndefined() : Boolean
   ```
   {% endtab %}
{% endtabs %}
## OperationCallExpression
{% tabs %}
{% endtabs %}
## PackageDeclaration
In order to group and organise OCL constraints, packages can be used.
{% tabs %}
{% endtabs %}
## PostExpression
A condition that has to be fulfilled after the operation addressed by the parent OperationCallExpression has been executed.
{% tabs %}
{% endtabs %}
## PreExpression
A condition that has to be fulfilled before executing the operation addressed by the parent OperationCallExpression.
{% tabs %}
{% endtabs %}
## VariableExpression
Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
{% tabs %}
{% endtabs %}

