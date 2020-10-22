import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';

export default ({ entry }) => {
  const { navigate, goBack } = useNavigation();
  const handleSetPrice = () => {
    goBack();
    navigate('PricingOptionsModal', { entry: entry });
  };
  if (!entry) return null;
  return (
    <Pressable onPress={handleSetPrice}>
      <View style={[styles.field, cursorPointer]}>
        <MaterialIcons name={'attach-money'} size={30} color={Colors.white} />
        <Text style={styles.text}>Set Price</Text>
      </View>
    </Pressable>
  );
};

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 50,
    marginTop: 10,
    width: '100%',
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
