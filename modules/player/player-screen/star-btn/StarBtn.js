import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';

@inject(stores => ({
  sendCredit: stores.userFavoritesStore.sendCredit.bind(
    stores.userFavoritesStore
  ),
  isFavorited: stores.userFavoritesStore.isFavorited,
  availableToCredit: stores.userFavoritesStore.availableToCredit,
  entry: stores.playerStore.entry,
  user: stores.sessionStore.user,
}))
export default class StarBtn extends React.Component {
  render() {
    if (!this.props.entry) {
      return null;
    }
    if (this.props.entry.userUsername === this.props.user.username) {
      return null;
    }
    if (!this.props.availableToCredit) {
      return null;
    }
    if (this.props.isFavorited) {
      return (
        <TouchableOpacity
          style={styles.controlTouch}
          onPress={() => this.props.sendCredit(this.props.entry)}
        >
          <MaterialIcons
            name="star-border"
            size={28}
            color={Colors.brandBlue}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={styles.controlTouch}
        onPress={() => this.props.sendCredit(this.props.entry)}
      >
        <MaterialIcons
          name="star-border"
          size={28}
          color={Colors.dividerBackground}
        />
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  controlTouch: {
    width: 32,
    height: 28,
    marginBottom: 6,
    marginLeft: 15,
  },
});
