import * as React from 'react';
import { Button, View } from 'react-native';
 


export default function SettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to notifications"
      />
    </View>
  );
}