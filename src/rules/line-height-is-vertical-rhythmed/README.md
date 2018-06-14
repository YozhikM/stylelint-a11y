# line-height-is-vertical-rhythmed

Disallow not vertical rhythmed line-height.

**Sources:**

- [Zell Liew](https://zellwk.com/blog/why-vertical-rhythms/)

## Options

### true

The following pattern are considered violations:

```css
.foo {
  line-height: 12px;
}
```

```css
.foo {
  line-height: 1.3;
}
```

```css
.foo {
  line-height: 50px;
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  line-height: 24px;
}
```

```css
.foo {
  line-height: 1.6;
}
```

```css
.foo {
  line-height: 48px;
}
```
