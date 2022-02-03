import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { observer } from 'mobx-react';
import RemoveIcon from 'app/modules/ui/icons/remove';
import Colors from 'app/constants/Colors';
import * as stores from 'app/skyhitz-common';
import { Stores } from 'app/functions/Stores';
import { useNavigation } from '@react-navigation/native';

type Stores = typeof stores;

export default observer(({ entry }) => {
  const { userEntriesStore, entryStore } = Stores();
  const { goBack } = useNavigation();

  const handleRemoveEntry = async () => {
    await entryStore.remove(entry.id);
    await userEntriesStore.refreshEntries();
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
