import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from 'app/constants/Colors';

const AuthLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.brandBlue} />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
  },
});
