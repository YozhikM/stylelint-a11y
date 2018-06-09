# stylelint-a11y

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
[![Build Status](https://travis-ci.org/YozhikM/stylelint-a11y.svg?branch=master)](https://travis-ci.org/YozhikM/stylelint-a11y)

## Installation and usage

```bash
yarn add --dev stylelint stylelint-a11y
```

Create the `.stylelintrc.json` config file (or open the existing one), add `stylelint-a11y` to the plugins array and the rules you need to the rules list. All rules from stylelint-a11y need to be namespaced with `a11y`.

```json
{
  "plugins": ["stylelint-a11y"],
  "rules": {
    "a11y/selector-pseudo-class-focus": true,
    "a11y/media-prefers-reduced-motion": true,
    "a11y/no-outline-none": true,
    "a11y/no-display-none": [true, { "severity": "warning" }]
  }
}
```

Please refer to [stylelint docs](http://stylelint.io/user-guide/) for the detailed info on using this linter.

## List of rules

- [`selector-pseudo-class-focus`](./src/rules/selector-pseudo-class-focus/README.md): Require or disallow a pseudo-element to the selectors with :hover
- [`media-prefers-reduced-motion`](./src/rules/media-prefers-reduced-motion/README.md): Require certain styles if the animation or transition in media features
- [`no-outline-none`](./src/rules/no-outline-none/README.md): Disallow outline clearing
- [`no-display-none`](./src/rules/no-display-none/README.md): Disallow content hiding with `{ display: none; }` property.

## Help out

There work on the plugin's rules is still in progress, so if you feel like it, you're welcome to help out in any of these (the plugin follows stylelint guidelines so most part of this is based on its docs):

- Create, enhance, and debug rules (see stylelint's guide to "[Working on rules](https://github.com/stylelint/stylelint/blob/master/docs/developer-guide/rules.md)").
- Improve documentation.
- Chime in on any open issue or pull request.
- Open new issues about your ideas on new rules, or for how to improve the existing ones, and pull requests to show us how your idea works.
- Add new tests to absolutely anything.
- Work on improving performance of rules.
- Contribute to [stylelint](https://github.com/stylelint/stylelint)
- Spread the word.

We communicate via [issues](https://github.com/YozhikM/stylelint-a11y/issues) and [pull requests](https://github.com/YozhikM/stylelint-a11y/pulls).

There is also [stackoverflow](http://stackoverflow.com/questions/tagged/stylelint), which would be the preferred QA forum.
