# selector-pseudo-class-focus

Checks the presence of a pseudo-class for selectors with `:hover`.

```css
a:hover,
a:focus {
}
```

This rule considers :focus pseudo-class selector defined in the CSS Specifications.
The `--fix` option on the command line can automatically fix all of the problems reported by this rule.

## Options

### true

The following pattern are considered violations:

```css
a:hover {
}
```

The following patterns are _not_ considered violations:

```css
a:hover,
a:focus {
}
```

```css
a:focus {
}
```

```css
a:hover {
}
a:focus {
}
```
