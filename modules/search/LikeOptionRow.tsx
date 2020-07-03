import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import { EvilIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';

export default observer(({ entry }) => {
  const { likesStore } = Stores();
  const { goBack } = useNavigation();

  const handleToggle = async () => {
    await likesStore.toggleLike(entry);
    goBack();
  };
  const isLiked = () => {
    return likesStore.isEntryLiked(entry);
  };
  if (!entry) {
    return null;
  }
  if (isLiked()) {
    return (
      <TouchableOpacity onPress={handleToggle}>
        <View style={styles.field}>
          <EvilIcons name={'like'} size={32} color={Colors.brandBlue} />
          <Text style={styles.textLiked}>Like</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={styles.field}>
        <EvilIcons name={'like'} size={32} color={Colors.dividerBackground} />
        <Text style={styles.text}>Like</Text>
      </View>
    </TouchableOpacity>
  );
});

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxHeight: 50,
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
