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
      column: 3,
    },
    {
      code: 'applet, a { color: pink; }',
      message: messages.expected('applet, a'),
      line: 1,
      column: 3,
    },
    {
      code: 'applet, blink { color: pink; }',
      message: messages.expected('applet, blink'),
      line: 1,
      column: 3,
    },
  ],
});
