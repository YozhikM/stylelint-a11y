# no-spread-text

Require width of text greater than 45 characters and less than 80 characters.

**Sources:**

- [Ryan Mack](https://ryanmack.me/quick-measure)
- [Manuel Matuzovic](https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939)

## Options

### true

The following pattern are considered violations:

```css
.foo {
  max-width: 40ch;
}
```

```css
.foo {
  max-width: 82ch;
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  max-width: 65ch;
}
```

```css
.foo {
  max-width: 100px;
}
```
