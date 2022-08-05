import React, { useState } from 'react';
import { Platform } from 'react-native';
import Colors from 'app/src/constants/Colors';
import SearchBar from 'app/src/ui/searchbar/SearchBar';
import { SearchStore } from '../stores/search';

let platform = Platform.OS === 'ios' ? 'ios' : 'android';

const SearchHeader = () => {
  const [value, setValue] = useState('');
  const { search } = SearchStore();

  const changeText = (value: any) => {
    setValue(value);
  };

  return (
    <SearchBar
      platform={platform}
      onChangeText={(q: any) => {
        search(q);
        changeText(q);
      }}
      placeholder="Search"
      icon={{
        style: { top: 15 },
        color: Colors.searchTextColor,
        name: 'search',
      }}
      clearIcon={true}
      value={value}
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
};

export default SearchHeader;
