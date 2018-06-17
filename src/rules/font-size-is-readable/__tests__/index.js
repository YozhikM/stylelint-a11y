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
      column: 4,
    },
    {
      code: '.bar { FONT-SIZE: 8PX; }',
      message: messages.expected('.bar'),
      line: 1,
      column: 4,
    },
  ],
});
