function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { processColor } from 'react-native';
import UIMenuView from './UIMenuView';
function processAction(action) {
  return {
    ...action,
    imageColor: processColor(action.imageColor),
    titleColor: processColor(action.titleColor),
    subactions: action.subactions?.map(subAction => processAction(subAction))
  };
}
const MenuView = ({
  actions,
  ...props
}) => {
  const processedActions = actions.map(action => processAction(action));
  return /*#__PURE__*/React.createElement(UIMenuView, _extends({}, props, {
    actions: processedActions
  }));
};
export { MenuView };
//# sourceMappingURL=index.js.map