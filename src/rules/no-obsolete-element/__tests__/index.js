import rule, { ruleName, messages } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { color: pink; }',
    },
  ],

  reject: [
    {
      code: 'blink { color: pink; }',
      message: messages.expected('blink'),
      line: 1,
      column: 4,
    },
  ],
});
