import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { }',
    },
    {
      code: '.foo { display: flex; max-width: 82ch; }',
    },
    {
      code: '.foo { height: 100%; max-width: 82ch; }',
    },
    {
      code: '.foo { text-transform: lowercase; max-width: 65ch; }',
    },
    {
      code: '.bar { word-spacing: -5px; max-width: 100px; }',
    },
    {
      code: '.baz { MAX-WIDTH: 63CH; }',
    },
  ],

  reject: [
    {
      code: '.foo { text-transform: lowercase; max-width: 40ch; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.bar { LINE-HEIGHT: 1.8; MAX-WIDTH: 81CH; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 3,
    },
  ],
});
