# media-prefers-reduced-motion

Require certain styles if the animation or transition in media features.

Safari 10.1 [introduced](https://webkit.org/blog/7551/responsive-design-for-motion/) the Reduced Motion Media Query. It is a non-vendor-prefixed declaration that allows developers to "create styles that avoid large areas of motion for users that specify a preference for reduced motion in System Preferences."

The `--fix` option on the command line can automatically fix all of the problems reported by this rule.

## Options

### true

The following pattern are considered violations:

```css
.foo {
  animation: 1s ease-in;
}
```

```css
.bar {
  animation-name: skew;
}
@media screen and (prefers-reduced-motion) {
  .bar {
    transition: none;
  }
}
```

The following patterns are _not_ considered violations:

```css
div {
  transition: none;
}
```

```css
.foo {
  transition: none;
}
@media screen and (prefers-reduced-motion: reduce) {
  .foo {
    transition: none;
  }
}
```

```css
.bar {
  animation: none;
}
@media screen and (prefers-reduced-motion) {
  .bar {
    animation: none;
  }
}
```
