import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { useNavigation } from '@react-navigation/native';

export default ({ entry }) => {
  const { navigate, goBack } = useNavigation();
  const handleSetPrice = () => {
    goBack();
    navigate('PricingOptionsModal', { entry: entry });
  };
  if (!entry) return null;
  return (
    <TouchableOpacity onPress={handleSetPrice}>
      <View style={styles.field}>
        <MaterialIcons name={'attach-money'} size={30} color={Colors.white} />
        <Text style={styles.text}>Set Price</Text>
      </View>
    </TouchableOpacity>
  );
};

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 50,
    width: Layout.window.width - 60,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  textLiked: {
    fontSize: 14,
    textAlign: 'left',
    paddingLeft: 10,
    color: Colors.brandBlue,
  },
});
