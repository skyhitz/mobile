import React from 'react';
import { inject } from 'mobx-react';
import SearchEntryList from 'app/modules/search/SearchEntryList';
import RecentlyAdded from 'app/modules/search/RecentlyAdded';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  isSearchActive: stores.entriesSearchStore.active,
  inputSearchStore: stores.inputSearchStore,
}))
class SearchEntryView extends React.Component<any, any> {
  static navigationOptions = {
    tabBarLabel: 'Music',
  };

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.props.inputSearchStore.updateSearchType('entries');
    }
  }

  render() {
    if (this.props.isSearchActive) {
      return <SearchEntryList />;
    }
    return <RecentlyAdded />;
  }
}

export default SearchEntryView;
