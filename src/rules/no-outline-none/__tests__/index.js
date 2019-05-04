import rule, { messages, ruleName } from '../index';

testRule(rule, {
  ruleName,
  config: [true],

  accept: [
    {
      code: '.foo { outline: 0; }',
    },
    {
      code: '$primary-color: #333; .bar:focus { outline: 1px solid $primary-color; }',
    },
    {
      code: '.baz:focus { outline: none; border-color: #333; }',
    },
    {
      code: '.quux:focus { outline: 0; border: 1px solid #000; }',
    },
    {
      code: '.quuux:focus { outline: none; box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); }',
    },
  ],

  reject: [
    {
      code: '.foo1:focus { outline: none; } .foo2:focus { outline: 1px solid red; }',
      message: messages.expected('.foo1:focus'),
      line: 1,
      column: 3,
    },
    {
      code: '.bar:focus { outline: none; }',
      message: messages.expected('.bar:focus'),
      line: 1,
      column: 3,
    },
    {
      code: '.baz:focus { outline: none; border: transparent; }',
      message: messages.expected('.baz:focus'),
      line: 1,
      column: 3,
    },
    {
      code: '.quux { .quuux:focus { outline: 0; } }',
      message: messages.expected('.quuux:focus'),
      line: 1,
      column: 11,
    },
  ],
});
