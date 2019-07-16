import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from 'app/constants/Colors';

export default class Divider extends React.Component<any, any> {
  render() {
    return <View style={styles.separator} />;
  }
}

let styles = StyleSheet.create({
  separator: {
    maxHeight: 1,
    backgroundColor: Colors.dividerBackground,
    flex: 1,
  },
});
