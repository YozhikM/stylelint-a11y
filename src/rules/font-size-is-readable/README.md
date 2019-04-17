# font-size-is-readable

Disallow font sizes less than 15px (or 11.25pt).

**Sources:**

- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size)
- [Marvel](https://blog.marvelapp.com/body-text-small/)

## Options

### true

The following pattern are considered violations:

```css
.foo {
  font-size: 10px;
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  font-size: 15px;
}
```

```css
.foo {
  font-size: 1em;
}
```
