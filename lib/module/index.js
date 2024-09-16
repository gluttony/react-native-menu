"use strict";

import React from 'react';
import { processColor } from 'react-native';
import UIMenuView from './UIMenuView';
import { jsx as _jsx } from "react/jsx-runtime";
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
  return /*#__PURE__*/_jsx(UIMenuView, {
    ...props,
    actions: processedActions
  });
};
export { MenuView };
//# sourceMappingURL=index.js.map