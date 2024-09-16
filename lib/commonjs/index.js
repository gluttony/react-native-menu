"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuView = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _UIMenuView = _interopRequireDefault(require("./UIMenuView"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function processAction(action) {
  return {
    ...action,
    imageColor: (0, _reactNative.processColor)(action.imageColor),
    titleColor: (0, _reactNative.processColor)(action.titleColor),
    subactions: action.subactions?.map(subAction => processAction(subAction))
  };
}
const MenuView = ({
  actions,
  ...props
}) => {
  const processedActions = actions.map(action => processAction(action));
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_UIMenuView.default, {
    ...props,
    actions: processedActions
  });
};
exports.MenuView = MenuView;
//# sourceMappingURL=index.js.map