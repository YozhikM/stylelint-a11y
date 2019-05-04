import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { }',
    },
    {
      code: '.foo { font-size: 15px; }',
    },
    {
      code: '.foo { font-size: 12pt; }',
    },
    {
      code: '.bar { FONT-SIZE: 15PX; }',
    },
    {
      code: '.baz { font-size: 1em; }',
    },
  ],

  reject: [
    {
      code: '.foo { font-size: 10px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.foo { font-size: 3pt; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.bar { FONT-SIZE: 8PX; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 3,
    },
  ],
});
