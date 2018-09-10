# Context

## ClassifierContextExpression

Define invariants and definitions on a given types

{% tabs %}
{% tab title="Definition" %}
```ocl
context &lt;Type&gt; (inv|def)
```
{% endtab %}
{% endtabs %}

## OperationContextExpression

The Operation Context Expression allows to define pre and or post conditions of functions.

{% tabs %}
{% tab title="Definition" %}
```ocl
context Person::kill() (pre|post)
```
{% endtab %}
{% tab title="Example" %}
```ocl

    context Person::setAge(age: number)
        pre: age &gt; 0
```
{% endtab %}
{% endtabs %}

## PropertyContextExpression

A PropertyContextDefinition allows to initialize or derive a value for the targeted property.

{% tabs %}
{% tab title="Definition" %}
```ocl
context Person::age (init|derive)
```
{% endtab %}
{% endtabs %}

