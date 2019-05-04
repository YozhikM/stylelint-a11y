import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: 'a { }',
    },
    {
      code: '.smallText { line-height: 24px; }',
    },
    {
      code: '.largeText { line-height: 48px; }',
    },
    {
      code: '.relText { line-height: 1.5; }',
    },
    {
      code: '.smallTextU { LINE-HEIGHT: 24PX; }',
    },
    {
      code: 'body { font-size: 15px; line-height: 48px; }',
    },
    {
      code: 'a { font-size: 15px; line-height: 1.6; }',
    },
  ],

  reject: [
    {
      code: '.foo { line-height: 12px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.foo { line-height: 50px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.foo { line-height: 1.2; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.foo { line-height: 12px; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: '.foo { LINE-HEIGHT: 23PX; }',
      message: messages.expected('.foo'),
      line: 1,
      column: 3,
    },
    {
      code: 'p { font-size: 23px; line-height: 23px; }',
      message: messages.expected('p'),
      line: 1,
      column: 3,
    },
    {
      code: 'a { font-size: 23px; line-height: 1; }',
      message: messages.expected('a'),
      line: 1,
      column: 3,
    },
  ],
});
