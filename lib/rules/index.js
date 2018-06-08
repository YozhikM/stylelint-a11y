'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selectorPseudoClassFocus = require('./selector-pseudo-class-focus');

var _selectorPseudoClassFocus2 = _interopRequireDefault(_selectorPseudoClassFocus);

var _mediaPrefersReducedMotion = require('./media-prefers-reduced-motion');

var _mediaPrefersReducedMotion2 = _interopRequireDefault(_mediaPrefersReducedMotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  'selector-pseudo-class-focus': _selectorPseudoClassFocus2.default,
  'media-prefers-reduced-motion': _mediaPrefersReducedMotion2.default
};