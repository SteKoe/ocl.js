# String

## ConcatExpression

Returns a string that is concatenated using source and body

{% tabs %}
{% tab title="Definition" %}
```ocl
String::concat (s : String) : String
```
{% endtab %}
{% tab title="Example" %}
```ocl
self.name.concat(&quot;string&quot;)
```
{% endtab %}
{% endtabs %}

## IndexOfExpression

Returns the index of the given string in self or 0 if it is not condained.

{% tabs %}
{% tab title="Definition" %}
```ocl
String::indexOf (s : String) : Number
```
{% endtab %}
{% tab title="Example" %}
```ocl
self.name.indexOf(&quot;string&quot;)
```
{% endtab %}
{% endtabs %}

## SubstringExpression

Returns a string containing all characters from self starting from index *start* up to index *end* included.
Both *start* and *end* parameters should be contained between *1* and *self.size()* included.
*start* cannot be greater than *end*.

{% tabs %}
{% tab title="Definition" %}
```ocl
String::substring (start : Number, end : Number) : String
```
{% endtab %}
{% tab title="Example" %}
```ocl
self.name.substring(0,2)
```
{% endtab %}
{% endtabs %}

## ToIntegerExpression

Tries to convert a string to a number.

{% tabs %}
{% tab title="Definition" %}
```ocl
String::toInteger () : Number
```
{% endtab %}
{% tab title="Example" %}
```ocl
&quot;3.414&quot;.toInteger()
```
{% endtab %}
{% endtabs %}

## ToLowerCaseExpression

Returns *self* as lower case string.

{% tabs %}
{% tab title="Definition" %}
```ocl
String:: toLowerCase () : String
```
{% endtab %}
{% tab title="Example" %}
```ocl
self.name.toLowerCase()
```
{% endtab %}
{% endtabs %}

## ToRealExpression

Tries to convert a string to a number.

{% tabs %}
{% tab title="Definition" %}
```ocl
String:: toReal () : Number
```
{% endtab %}
{% tab title="Example" %}
```ocl
&quot;3.414&quot;.toReal()
```
{% endtab %}
{% endtabs %}

## ToUpperCaseExpression

Returns *self* into upper case string.

{% tabs %}
{% tab title="Definition" %}
```ocl
String:: toUpperCase () : String
```
{% endtab %}
{% tab title="Example" %}
```ocl
self.name.toUpperCase()
```
{% endtab %}
{% endtabs %}

