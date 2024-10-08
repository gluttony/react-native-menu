#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RCTUIMenu, RCTViewManager)

/**
 * title: Short description to be displayed above the menu.
 */
RCT_EXPORT_VIEW_PROPERTY(title, NSString);
/**
 * actions: Array of actions that are included in the menu
 */
RCT_EXPORT_VIEW_PROPERTY(actions, NSArray);
/**
 * onPressAction: callback to be called once user selects an action
 */
RCT_EXPORT_VIEW_PROPERTY(onPressAction, RCTDirectEventBlock);
/**
 * shouldOpenOnLongPress: determines whether menu should be opened after long press or normal press
 */
RCT_EXPORT_VIEW_PROPERTY(shouldOpenOnLongPress, BOOL)
/**
 * themeVariant: determines whether menu should use dark theme, light theme or system theme
 */
RCT_EXPORT_VIEW_PROPERTY(themeVariant, NSString)

/**
 * Boolean value determines whether UIMenu should be anchored to right corner of parent view
 */
RCT_EXPORT_VIEW_PROPERTY(isAnchoredToRight, BOOL)
/**
 * onMenuShow: callback when menu shows
 */
RCT_EXPORT_VIEW_PROPERTY(onMenuShow, RCTDirectEventBlock);
/**
 * onMenuDismiss: callback when menu shows
 */
RCT_EXPORT_VIEW_PROPERTY(onMenuDismiss, RCTDirectEventBlock);
/**
 * disabled: determines whether menu should be disabled
 */
RCT_EXPORT_VIEW_PROPERTY(disabled, BOOL)

@end
