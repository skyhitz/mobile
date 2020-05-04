import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import Colors from 'app/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Stores } from 'app/functions/Stores';
import { observer } from 'mobx-react';

const DoneEditBtn = observer(props => {
  const { goBack } = useNavigation();
  const { editProfileStore } = Stores();

  const closeProfileModal = () => {
    editProfileStore.updateProfile();
    goBack();
  };
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={closeProfileModal}
      disabled={!editProfileStore.canUpdate}
    >
      <Text
        style={[
          styles.white,
          { opacity: editProfileStore.canUpdate ? 1 : 0.4 },
        ]}
      >
        Done
      </Text>
    </TouchableOpacity>
  );
});

export default DoneEditBtn;

const styles = StyleSheet.create({
  btn: {
    paddingRight: 10,
  },
  white: {
    color: Colors.white,
  },
});
