# stylelint-a11y

[![NPM version](http://img.shields.io/npm/v/stylelint-a11y.svg)](https://www.npmjs.org/package/stylelint-a11y)
[![npm](https://img.shields.io/npm/dt/stylelint-a11y.svg)](http://www.npmtrends.com/stylelint-a11y)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)
[![Build Status](https://travis-ci.org/YozhikM/stylelint-a11y.svg?branch=master)](https://travis-ci.org/YozhikM/stylelint-a11y)

## Installation and usage

```bash
yarn add --dev stylelint stylelint-a11y
```

Create the `.stylelintrc.json` config file (or open the existing one), add `stylelint-a11y` to the plugins array and the rules you need to the rules list. All rules from stylelint-a11y need to be namespaced with `a11y`.

Please refer to [stylelint docs](https://stylelint.io/user-guide/) for the detailed info on using this linter.

## Rules

- ⭐️ - the mark of recommended rules.
- ✒️ - the mark of fixable rules.

|       | Rule ID                                                                                    | Description                                                             |
| :---- | :----------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
|       | [content-property-no-static-value](./src/rules/content-property-no-static-value/README.md) | Disallow unaccessible CSS generated content in pseudo-elements          |
|       | [font-size-is-readable](./src/rules/font-size-is-readable/README.md)                       | Disallow font sizes less than `15px`                                    |
|       | [line-height-is-vertical-rhythmed](./src/rules/line-height-is-vertical-rhythmed/README.md) | Disallow not vertical rhythmed `line-height`                            |
| ⭐️✒️ | [media-prefers-reduced-motion](./src/rules/media-prefers-reduced-motion/README.md)         | Require certain styles if the animation or transition in media features |
|       | [media-prefers-color-scheme](./src/rules/media-prefers-color-scheme/README.md)             | Require implementation of certain styles for selectors with colors.     |
|       | [no-display-none](./src/rules/no-display-none/README.md)                                   | Disallow content hiding with `display: none` property                   |
|       | [no-obsolete-attribute](./src/rules/no-obsolete-attribute/README.md)                       | Disallow obsolete attribute using                                       |
|       | [no-obsolete-element](./src/rules/no-obsolete-element/README.md)                           | Disallow obsolete selectors using                                       |
|       | [no-spread-text](./src/rules/no-spread-text/README.md)                                     | Require width of text in a comfortable range                            |
| ⭐️   | [no-outline-none](./src/rules/no-outline-none/README.md)                                   | Disallow outline clearing                                               |
|       | [no-text-align-justify](./src/rules/no-text-align-justify/README.md)                       | Disallow content with `text-align: justify`                             |
| ⭐️✒️ | [selector-pseudo-class-focus](./src/rules/selector-pseudo-class-focus/README.md)           | Require or disallow a pseudo-element to the selectors with `:hover`     |

## Recommended config

Add recommended configuration by simply adding the following to `extends` in your stylelint configuration:

```
stylelint-a11y/recommended
```

This shareable config contains the following:

```json
{
  "plugins": ["stylelint-a11y"],
  "rules": {
    "a11y/media-prefers-reduced-motion": true,
    "a11y/no-outline-none": true,
    "a11y/selector-pseudo-class-focus": true
  }
}
```

Since it adds stylelint-a11y to `plugins`, you don't have to do this yourself when extending this config.

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

There is also [stackoverflow](https://stackoverflow.com/questions/tagged/stylelint), which would be the preferred QA forum.
