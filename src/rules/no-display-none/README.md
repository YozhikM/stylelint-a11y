# no-display-none

Sources that will help you do without `{ display: none; }` and hide the content:

- [CSS Tricks](https://css-tricks.com/places-its-tempting-to-use-display-none-but-dont/)
- [A11Y Project](https://a11yproject.com/posts/how-to-hide-content/)
- [WebAIM](https://webaim.org/techniques/css/invisiblecontent/)

## Options

### true

The following pattern are considered violations:

```css
.foo {
  display: none;
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  display: flex;
}
```
