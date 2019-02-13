import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IOSSearchBar from './SearchBar.ios';
import AndroidSearchBar from './SearchBar.android';

const SEARCHBAR_COMPONENTS = {
  ios: IOSSearchBar,
  android: AndroidSearchBar,
};

class SearchBar extends Component {
  render() {
    const SearchBar = SEARCHBAR_COMPONENTS[this.props.platform];
    return <SearchBar {...this.props} />;
  }
}

SearchBar.propTypes = {
  platform: PropTypes.oneOf(['ios', 'android']),
};

export default SearchBar;
