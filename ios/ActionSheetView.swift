//
//  MenuView.swift
//  react-native-menu
//
//  Created by Jesse Katsumata on 11/3/20.
//

import UIKit

class MenuAlertController: UIAlertController {
    var onMenuShow: RCTDirectEventBlock?
    var onMenuDismiss: RCTDirectEventBlock?

    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)

        if let onMenuShow = onMenuShow {
            onMenuShow(nil)
        }
    }

    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)

        if let onMenuDismiss = onMenuDismiss {
            onMenuDismiss(nil)
        }
    }
}

@objc(ActionSheetView)
class ActionSheetView: UIView {
    @objc var onMenuShow: RCTDirectEventBlock?
    @objc var onMenuDismiss: RCTDirectEventBlock?
    @objc var onPressAction: RCTDirectEventBlock?
    private var _title: String?
    @objc var title: NSString? {
        didSet { self._title = title as? String }
    }

    @objc var isAnchoredToRight: Bool = false
    @objc var disabled: Bool = false

    private var _actions: [UIAlertAction] = []
    @objc var actions: [NSDictionary]? {
        didSet {
            guard let actions = self.actions else {
                return
            }
            _actions.removeAll()
            actions.forEach({ alertAction in
                if let action = RCTAlertAction(details: alertAction).createAction({
                    event in self.sendButtonAction(event)
                }) {
                    _actions.append(action)
                }
            })
        }
    }

    @objc var shouldOpenOnLongPress: Bool = false

    private var _themeVariant: String?
    @objc var themeVariant: NSString? {
        didSet { self._themeVariant = themeVariant as? String }
    }

    override init(frame: CGRect) {
        super.init(frame: frame)
        let tap = UITapGestureRecognizer(target: self, action: #selector(self.handleTap(_:)))
        let longPress = UILongPressGestureRecognizer(
            target: self, action: #selector(self.handleLongPress(_:)))
        self.addGestureRecognizer(tap)
        self.addGestureRecognizer(longPress)
    }

    func launchActionSheet() {

        let alert = MenuAlertController(title: _title, message: nil, preferredStyle: .actionSheet)
        alert.onMenuShow = self.onMenuShow
        alert.onMenuDismiss = self.onMenuDismiss

        if #available(iOS 13.0, *) {
            if self._themeVariant != nil {
                if self._themeVariant == "dark" {
                    alert.overrideUserInterfaceStyle = .dark
                } else if self._themeVariant == "light" {
                    alert.overrideUserInterfaceStyle = .light
                } else {
                    alert.overrideUserInterfaceStyle = .unspecified
                }
            }
        }

        self._actions.forEach({ action in
            alert.addAction(action.copy() as! UIAlertAction)
        })

        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: nil))

        if UIDevice.current.userInterfaceIdiom == .pad {
            alert.modalPresentationStyle = .popover
            alert.popoverPresentationController?.sourceView = self
            alert.popoverPresentationController?.sourceRect = self.bounds
        }
        
        if (!self.disabled) {
            if let root = RCTPresentedViewController() {
                root.present(alert, animated: true, completion: nil)
            }
        }
    }

    @objc func handleTap(_ sender: UITapGestureRecognizer) {
        if shouldOpenOnLongPress {
            return
        }
        if sender.state == .ended {
            DispatchQueue.main.async {
                self.launchActionSheet()
            }
        }
    }

    @objc func handleLongPress(_ sender: UILongPressGestureRecognizer) {
        if !shouldOpenOnLongPress {
            return
        }
        if sender.state == .ended {
            DispatchQueue.main.async {
                self.launchActionSheet()
            }
        }
    }

    @objc func sendButtonAction(_ action: String) {
        if let onPress = onPressAction {
            onPress(["event": action])
        }
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func reactSetFrame(_ frame: CGRect) {
        super.reactSetFrame(frame)
    }

}
