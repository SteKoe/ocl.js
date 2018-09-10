# Gate

## AndExpression

&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
A        B       A and B
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
false    false   false
false    true    false
true     false   false
true     true    true
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

{% tabs %}
{% tab title="Example" %}
```ocl
false and true
```
{% endtab %}
{% endtabs %}

## ImpliesExpression

&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
A        B       A implies B
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
false    false   true
false    true    true
true     false   false
true     true    true
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

{% tabs %}
{% tab title="Example" %}
```ocl
false implies true
```
{% endtab %}
{% endtabs %}

## NotExpression

&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
A        NOT A
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
true     false
false    true
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

{% tabs %}
{% tab title="Example" %}
```ocl
not false
```
{% endtab %}
{% endtabs %}

## OrExpression

&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
A        B       A or B
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
false    false   false
false    true    true
true     false   true
true     true    true
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

{% tabs %}
{% tab title="Example" %}
```ocl
false or true
```
{% endtab %}
{% endtabs %}

## XorExpression

&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
A        B       A xor B
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;
false    false   false
false    true    true
true     false   true
true     true    false
&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;    &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;   &#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;&#x3D;

{% tabs %}
{% tab title="Example" %}
```ocl
false xor true
```
{% endtab %}
{% endtabs %}

