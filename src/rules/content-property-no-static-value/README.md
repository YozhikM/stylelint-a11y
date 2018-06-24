# content-property-no-static-value

Disallow CSS generated content except aria-label attribute content and empty strings.

**Sources:**

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/content)
- [tink](https://tink.uk/accessibility-support-for-css-generated-content//)

## Options

### true

The following pattern are considered violations:

```css
.foo::before {
  content: 'Price: $50';
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  content: '';
}
```

```css
.foo {
  content: attr(aria-label);
}
```
