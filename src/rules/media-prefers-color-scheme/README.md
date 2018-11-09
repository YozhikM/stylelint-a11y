# media-prefers-color-scheme

Require implementation of certain styles for selectors with colors.

**Sources:**

- [Docs](https://drafts4.csswg.org/mediaqueries-5/#prefers-color-scheme)
- [less mixin](https://brehaut.net/blog/2018/a_dark_mode_less_mixin)
- [Webkit](https://trac.webkit.org/changeset/237156/webkit)
- [Safari TP](https://webkit.org/blog/8475/release-notes-for-safari-technology-preview-68)
- [Mojave](https://www.apple.com/lae/macos/mojave)

## Options

### true

The following pattern are considered violations:

```css
.foo {
  color: red;
}
```

```css
.bar {
  color: red;
}
.baz {
  background-color: red;
}
@media screen and (prefers-color-scheme: dark) {
  .baz {
    background-color: white;
  }
}
```

```css
.foo {
  color: red;
}
@media screen and (prefers-color-scheme: dark) {
  .foo {
    background-color: red;
  }
}
```

The following patterns are _not_ considered violations:

```css
.foo {
  color: red;
}
@media screen and (prefers-color-scheme: dark) {
  .foo {
    color: white;
  }
}
```

```css
.bar {
  background-color: white;
}
@media screen and (prefers-color-scheme: dark) {
  .bar {
    background-color: gray;
  }
}
```
