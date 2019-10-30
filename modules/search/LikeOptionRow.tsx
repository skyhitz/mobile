import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { inject } from 'mobx-react';
import { EvilIcons } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import { goBack } from 'app/modules/navigation/Navigator';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  toggleLike: stores.likesStore.toggleLike.bind(stores.likesStore),
  isEntryLiked: stores.likesStore.isEntryLiked.bind(stores.likesStore),
}))
export default class LikeOptionRow extends React.Component<any, any> {
  handleToggle() {
    this.props.toggleLike(this.props.entry);
    this.forceUpdate();
    goBack();
  }
  get isLiked() {
    return this.props.isEntryLiked(this.props.entry);
  }
  render() {
    if (!this.props.entry) {
      return null;
    }
    if (this.isLiked) {
      return (
        <TouchableOpacity onPress={this.handleToggle.bind(this)}>
          <View style={styles.field}>
            <EvilIcons name={'like'} size={32} color={Colors.brandBlue} />
            <Text style={styles.textLiked}>Like</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={this.handleToggle.bind(this)}>
        <View style={styles.field}>
          <EvilIcons name={'like'} size={32} color={Colors.dividerBackground} />
          <Text style={styles.text}>Like</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
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
