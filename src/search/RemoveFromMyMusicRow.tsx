import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import RemoveIcon from 'app/src/ui/icons/remove';
import Colors from 'app/src/constants/Colors';
import * as stores from 'app/src/stores';
import { Stores } from 'app/src/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import { UserEntriesStore } from '../stores/user-entries';

type Stores = typeof stores;

export default observer(({ entry }) => {
  const { entryStore } = Stores();
  const { refreshEntries } = UserEntriesStore();
  const { goBack } = useNavigation();

  const handleRemoveEntry = async () => {
    await entryStore.remove(entry.id);
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
});

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
