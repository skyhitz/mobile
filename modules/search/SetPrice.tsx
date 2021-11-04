import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { CommonActions, useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/constants/CursorPointer';
import DollarIcon from 'app/modules/ui/icons/dollar';

export default ({ entry }) => {
  const { dispatch, goBack } = useNavigation();
  const handleSetPrice = () => {
    goBack();
    dispatch(
      CommonActions.navigate({
        name: 'PricingOptionsModal',
        params: {
          entry: entry,
        },
      })
    );
  };
  if (!entry) return null;
  return (
    <Pressable onPress={handleSetPrice}>
      <View style={[styles.field, cursorPointer]}>
        <DollarIcon size={20} color={Colors.white} />
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
    height: 40,
    marginBottom: 10,
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
