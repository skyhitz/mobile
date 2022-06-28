import React, { Component } from 'react';
import IOSSearchBar from './SearchBar.ios';
import AndroidSearchBar from './SearchBar.android';

const SEARCHBAR_COMPONENTS: any = {
  ios: IOSSearchBar,
  android: AndroidSearchBar,
};

class SearchBar extends Component<any, any> {
  render() {
    const SearchBar: any = SEARCHBAR_COMPONENTS[this.props.platform];
    return <SearchBar {...this.props} />;
  }
}

export default SearchBar;
