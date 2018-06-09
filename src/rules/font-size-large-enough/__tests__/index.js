import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { font-size: 15px; }',
    },
    {
      code: '.foo { font-size: 1em; }',
    },
  ],

  reject: [
    {
      code: '.foo { font-size: 10px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 4,
    },
  ],
});
