"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuView = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _UIMenuView = _interopRequireDefault(require("./UIMenuView"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/_react.default.createElement(_UIMenuView.default, _extends({}, props, {
    actions: processedActions
  }));
};
exports.MenuView = MenuView;
//# sourceMappingURL=index.js.map