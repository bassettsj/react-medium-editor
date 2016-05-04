'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _editor = require('../editor');

var _editor2 = _interopRequireDefault(_editor);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.unmock('../editor'); // -weak


describe('Editor', function () {
  it('should be able to pass a smoke test', function () {
    return expect(true).toBe(true);
  });
  it('should be able to render', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_editor2.default, null));
    expect(wrapper.find('[contentEditable]').length).toBe(1);
  });

  xit('should not have the placeholder after receiving new props', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_editor2.default, { text: '' }));
  });
});