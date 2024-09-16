import React from 'react';
import { Platform, StyleSheet, Text, Button, View } from 'react-native';
import { MenuView } from 'react-native-menu';

export default function App() {
  const [themeVariant, setThemeVariant] = React.useState<string>('light');
  const [disabled, setDisabled] = React.useState<boolean>(false);

  return (
    <View style={themeStyles(themeVariant).container}>
      <MenuView
        title="Menu Title"
        onPressAction={({ nativeEvent }) => {
          console.log(JSON.stringify(nativeEvent));
        }}
        actions={[
          {
            id: 'add',
            title: 'Add to List',
            titleColor: '#2367A2',
            image: Platform.select({
              ios: 'plus',
              android: 'ic_menu_add',
            }),
            imageColor: '#2367A2',
            subactions: [
              {
                id: 'nested1',
                title: 'Nested action',
                titleColor: 'rgba(250,180,100,0.5)',
                subtitle: 'State is mixed',
                image: Platform.select({
                  ios: 'heart.fill',
                  android: 'ic_menu_today',
                }),
                imageColor: 'rgba(100,200,250,0.3)',
                state: 'mixed',
              },
              {
                id: 'nestedDestructive',
                title: 'Destructive Action',
                attributes: {
                  destructive: true,
                },
                image: Platform.select({
                  ios: 'trash',
                  android: 'ic_menu_delete',
                }),
              },
            ],
          },
          {
            id: 'share',
            title: 'Share Action',
            titleColor: '#46F289',
            subtitle: 'Share action on SNS',
            image: Platform.select({
              ios: 'square.and.arrow.up',
              android: 'ic_menu_share',
            }),
            imageColor: '#46F289',
            state: 'on',
          },
          {
            id: 'mixed',
            title: 'Mixed State',
            titleColor: 'rgba(100,200,250,0.3)',
            subtitle: 'State is mixed',
            image: Platform.select({
              ios: 'heart.fill',
              android: 'ic_menu_today',
            }),
            imageColor: 'rgba(100,200,250,0.3)',
            state: 'mixed',
            subactions: [
              {
                id: 'nested2',
                title: 'Nested action',
                titleColor: 'rgba(250,180,100,0.5)',
                subtitle: 'State is mixed',
                image: Platform.select({
                  ios: 'tray',
                  android: 'ic_menu_agenda',
                }),
                imageColor: 'rgba(100,200,250,0.3)',
                state: 'mixed',
              },
              {
                id: 'nestedMixed',
                title: 'Mixed State',
                subtitle: 'State is mixed',
                image: Platform.select({
                  ios: 'heart.fill',
                  android: 'ic_menu_today',
                }),
                imageColor: '#46F289',
                subactions: [
                  {
                    id: 'nestednesteddisabled',
                    title: 'Disabled Action',
                    subtitle: 'Action is disabled',
                    attributes: {
                      disabled: true,
                    },
                    image: Platform.select({
                      ios: 'tray',
                      android: 'ic_menu_agenda',
                    }),
                  },
                  {
                    id: 'nestednestedhidden',
                    title: 'Hidden Action',
                    subtitle: 'Action is hidden',
                    attributes: {
                      hidden: true,
                    },
                  },
                  {
                    id: 'nestednesteddestructive',
                    title: 'Destructive Action',
                    attributes: {
                      destructive: true,
                    },
                    image: Platform.select({
                      ios: 'trash',
                      android: 'ic_menu_delete',
                    }),
                  },
                ],
              },
            ],
          },
          {
            id: 'disabled',
            title: 'Disabled Action',
            subtitle: 'Action is disabled',
            attributes: {
              disabled: true,
            },
            image: Platform.select({
              ios: 'tray',
              android: 'ic_menu_agenda',
            }),
          },
          {
            id: 'hidden',
            title: 'Hidden Action',
            subtitle: 'Action is hidden',
            attributes: {
              hidden: true,
            },
          },
          {
            id: 'destructive',
            title: 'Destructive Action',
            attributes: {
              destructive: true,
            },
            image: Platform.select({
              ios: 'trash',
              android: 'ic_menu_delete',
            }),
          },
        ]}
        shouldOpenOnLongPress={false}
        themeVariant={themeVariant}
        isAnchoredToRight
        onMenuShow={() => {
          console.log('onMenuShow');
        }}
        onMenuDismiss={() => {
          console.log('onMenuDismiss');
        }}
        disabled={disabled}
      >
        <View style={styles.button}>
          <Text style={themeStyles(themeVariant).buttonText}>Test</Text>
        </View>
      </MenuView>
      <View style={styles.themeBtn}>
        <Button
          title={themeVariant === 'light' ? 'dark' : 'light'}
          onPress={() => {
            setThemeVariant(themeVariant === 'light' ? 'dark' : 'light');
          }}
        />
        <Button
          title={disabled ? 'Enable' : 'Disable'}
          onPress={() => {
            setDisabled(!disabled);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeBtn: {
    marginTop: 20,
    flex: 0.2,
    justifyContent: 'space-around',
  },
});

const themeStyles = (theme: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme === 'light' ? 'white' : 'black',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    buttonText: { color: theme === 'light' ? 'black' : 'white' },
  });
