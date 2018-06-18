import rule, { messages, ruleName } from '../index'; // eslint-disable-line

testRule(rule, {
  ruleName,
  config: [true],
  fix: true,

  accept: [
    {
      code: 'a { }',
    },
    {
      code: 'a:focus { }',
    },
    {
      code: 'a:hover, a:focus { }',
    },
    {
      code: 'a:hover { } a:focus { }',
    },
    {
      code: 'a:focus { outline: thin dotted; } a:active, a:hover { outline: 0; }',
    },
  ],

  reject: [
    {
      code: 'a:hover { }',
      fixed: 'a:hover, a:focus { }',
      message: messages.expected('a:hover'),
    },
    {
      code: 'a:hover { } b:hover { }',
      fixed: 'a:hover, a:focus { } b:hover, b:focus { }',
      message: messages.expected('a:hover'),
    },
    {
      code: 'a:hover { } a:focus { } b:hover { } b { }',
      fixed: 'a:hover { } a:focus { } b:hover, b:focus { } b { }',
      message: messages.expected('b:hover'),
    },
    {
      code: 'a:hover, a:focus { } b:hover { } b { }',
      fixed: 'a:hover, a:focus { } b:hover, b:focus { } b { }',
      message: messages.expected('b:hover'),
    },
  ],
});
