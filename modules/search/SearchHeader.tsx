import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { inject } from 'mobx-react';
import Colors from 'app/constants/Colors';
import SearchBar from 'app/modules/ui/searchbar/SearchBar';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

let platform = Platform.OS === 'ios' ? 'ios' : 'android';

@inject((stores: Stores) => ({
  inputSearchStore: stores.inputSearchStore,
}))
class SearchHeader extends React.Component<any, any> {
  state = {
    value: '',
  };

  changeText = value => {
    this.setState({ value });
  };

  render() {
    return (
      <SearchBar
        platform={platform}
        cancelButtonTitle="Cancel"
        onChangeText={q => {
          this.props.inputSearchStore.search(q);
          this.changeText(q);
        }}
        placeholder="Search"
        icon={{
          style: { top: 15 },
          color: Colors.searchTextColor,
          name: 'search',
        }}
        clearIcon={true}
        value={this.state.value}
        autoCorrect={false}
        placeholderTextColor={Colors.searchTextColor}
        inputStyle={{
          height: 30,
          margin: 7.5,
          borderRadius: 5,
          color: Colors.searchTextColor,
        }}
      />
    );
  }
}

export default SearchHeader;
