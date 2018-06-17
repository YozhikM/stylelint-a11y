# no-outline-none

Disallow outline clearing.

Why? [Because](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible)

**Sources:**

- [DON'T DO IT!](http://www.outlinenone.com/)
- [a11yproject](https://a11yproject.com/posts/never-remove-css-outlines/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)

## Options

### true

The following pattern are considered violations:

```css
.foo:focus {
  outline: 0;
}
```

```css
.bar:focus {
  outline: none;
}
```

```css
.baz:focus {
  outline: none;
  border: transparent;
}
```

```scss
.quux {
  .quuux:focus {
    outline: 0;
  }
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  outline: 0;
}
```

```scss
$primary-color: #333;
.bar:focus {
  outline: 1px solid $primary-color;
}
```

```css
.baz:focus {
  outline: 1px solid #333;
}
```

```css
.quux:focus {
  outline: 0;
  border: 1px solid #000;
}
```

## Note

[Similar rule](https://github.com/stylelint/stylelint/blob/master/lib/rules/declaration-property-value-blacklist/README.md) is in [Stylelint](https://github.com/stylelint/stylelint), but it triggers another error message and does not check for `:focus` selector and `border` property.

```json
{
  "declaration-property-value-blacklist": {
    "outline": ["none", "0"]
  }
}
```
