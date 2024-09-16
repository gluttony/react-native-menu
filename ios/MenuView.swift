//
//  MenuView.swift
//  react-native-menu
//
//  Created by Jesse Katsumata on 11/3/20.
//

import UIKit

@available(iOS 14.0, *)
@objc(MenuView)
class MenuView: UIButton {
    @objc var onMenuShow: RCTDirectEventBlock?
    @objc var onMenuDismiss: RCTDirectEventBlock?

    override func menuAttachmentPoint(for configuration: UIContextMenuConfiguration) -> CGPoint {
        let original = super.menuAttachmentPoint(for: configuration)

        if self.isAnchoredToRight {
            return CGPoint(x: UIScreen.main.bounds.width - 70, y: original.y)
        }

        return original
    }

    private var _actions: [UIMenuElement] = []
    @objc var actions: [NSDictionary]? {
        didSet {
            guard let actions = self.actions else {
                return
            }
            _actions.removeAll()
            actions.forEach { menuAction in
                _actions.append(
                    RCTMenuAction(details: menuAction).createUIMenuElement({ action in
                        self.sendButtonAction(action)
                    }))
            }
            self.setup()
        }
    }

    private var _title: String = ""
    @objc var title: NSString? {
        didSet {
            guard let title = self.title else {
                return
            }
            self._title = title as String
            self.setup()
        }
    }
    @objc var onPressAction: RCTDirectEventBlock?

    @objc var shouldOpenOnLongPress: Bool = false {
        didSet {
            self.setup()
        }
    }

    @objc var isAnchoredToRight: Bool = false

    private var _themeVariant: String?
    @objc var themeVariant: NSString? {
        didSet {
            self._themeVariant = themeVariant as? String
            self.setup()
        }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.setup()
    }

    func setup() {
        let menu = UIMenu(title: _title, identifier: nil, children: self._actions)

        if self._themeVariant != nil {
            if self._themeVariant == "dark" {
                self.overrideUserInterfaceStyle = .dark
            } else if self._themeVariant == "light" {
                self.overrideUserInterfaceStyle = .light
            } else {
                self.overrideUserInterfaceStyle = .unspecified
            }
        }

        self.menu = menu
        let interaction = UIContextMenuInteraction(delegate: self)
        self.addInteraction(interaction)
        self.showsMenuAsPrimaryAction = !shouldOpenOnLongPress
    }

    override func reactSetFrame(_ frame: CGRect) {
        super.reactSetFrame(frame)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    @objc func sendButtonAction(_ action: UIAction) {
        if let onPress = onPressAction {
            onPress(["event": action.identifier.rawValue])
        }
    }

    override func contextMenuInteraction(
        _ interaction: UIContextMenuInteraction,
        willDisplayMenuFor configuration: UIContextMenuConfiguration,
        animator: (any UIContextMenuInteractionAnimating)?
    ) {
        super.contextMenuInteraction(
            interaction, willDisplayMenuFor: configuration, animator: animator)
        
        if let onMenuShow = onMenuShow {
            onMenuShow(nil)
        }
    }

    override func contextMenuInteraction(
        _ interaction: UIContextMenuInteraction,
        willEndFor configuration: UIContextMenuConfiguration,
        animator: UIContextMenuInteractionAnimating?
    ) {
        super.contextMenuInteraction(interaction, willEndFor: configuration, animator: animator)
        
        if let onMenuDismiss = onMenuDismiss {
            onMenuDismiss(nil)
        }
    }
}
