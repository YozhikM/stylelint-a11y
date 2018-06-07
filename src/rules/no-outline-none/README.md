# no-outline-none

Disallow outline clearing.

Why? [Because](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible)

**Sources**:
[DON'T DO IT!](http://www.outlinenone.com/)
[a11yproject](https://a11yproject.com/posts/never-remove-css-outlines/)
[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)

## Options

### true

The following pattern are considered violations:

```css
.foo1 {
  outline: none;
}
.foo2 {
  outline: 1px solid red;
}
```

```css
.bar {
  outline: none;
}
```

```css
.baz {
  outline: 0;
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  outline: 1px solid #666;
}
```
