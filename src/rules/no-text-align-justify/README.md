# justify

Disallow `{ font-align: justify; }` anywhere.

**Sources:**

- [W3C](https://www.w3.org/TR/WCAG20-TECHS/G169.html)
- [Design for Hackers](https://designforhackers.com/blog/justify-text-html-css/)

## Options

### true

The following pattern are considered violations:

```css
.foo {
  font-align: justify;
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  font-align: center;
}
```

```css
.foo {
  font-align:  left;
}
```

```css
.foo {
  font-align:  right;
}
```

```css
.foo {
  font-align: start;
}
```

```css
.foo {
  font-align: end;
}
```
