import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import RemoveIcon from 'app/src/ui/icons/remove';
import Colors from 'app/src/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { UserEntriesStore } from '../stores/user-entries';
import { EntryStore } from '../stores/entry';

export default ({ entry }) => {
  const { remove } = EntryStore();
  const { refreshEntries } = UserEntriesStore();
  const { goBack } = useNavigation();

  const handleRemoveEntry = async () => {
    await remove(entry.id);
    await refreshEntries();
    goBack();
  };

  if (!entry) {
    return null;
  }
  return (
    <Pressable onPress={handleRemoveEntry}>
      <View style={styles.field}>
        <RemoveIcon size={20} color={Colors.white} />
        <Text style={styles.text}>Remove from platform</Text>
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
