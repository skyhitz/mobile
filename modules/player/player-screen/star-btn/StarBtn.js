import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { inject } from 'mobx-react/native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';

const Placeholder = () => <View style={styles.controlTouch} />;

@inject(stores => ({
  sendCredit: stores.userFavoritesStore.sendCredit.bind(
    stores.userFavoritesStore
  ),
  isFavorited: stores.userFavoritesStore.isFavorited,
  availableToCredit: stores.userFavoritesStore.availableToCredit,
  credits: stores.userFavoritesStore.creditsSent,
  entry: stores.playerStore.entry,
  user: stores.sessionStore.user,
}))
export default class StarBtn extends React.Component {
  render() {
    if (!this.props.entry) {
      return <Placeholder />;
    }
    if (this.props.entry.userUsername === this.props.user.username) {
      return (
        <View style={styles.controlTouch}>
          <MaterialIcons
            name="star-border"
            size={28}
            color={Colors.dividerBackground}
          />
          <Text style={styles.creditsText}>{this.props.credits}</Text>
        </View>
      );
    }
    if (!this.props.availableToCredit) {
      return <Placeholder />;
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
          <Text style={styles.creditsText}>{this.props.credits}</Text>
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
        <Text style={styles.creditsText}>{this.props.credits}</Text>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  controlTouch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  creditsText: {
    color: 'white',
    marginLeft: 10,
  },
});
