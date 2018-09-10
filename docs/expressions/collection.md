# Collection

## Any expression

Return the first element that matches the given OclExpression.

{% tabs %}
{% tab title="Definition" %}
```
any(expr : OclExpression) : T
```
{% endtab %}

{% tab title="Example" %}
```ocl
self.collection->any(i < 2)
```
{% endtab %}
{% endtabs %}

