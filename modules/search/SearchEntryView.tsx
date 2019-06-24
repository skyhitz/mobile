import React from 'react';
import { withNavigationFocus } from 'react-navigation';
import { inject } from 'mobx-react';
import SearchEntryList from 'app/modules/search/SearchEntryList';
import TopRecentEntryView from 'app/modules/search/TopRecentEntryView';
import { Stores } from 'skyhitz-common';

@inject((stores:Stores) => ({
  isSearchActive: stores.entriesSearchStore.active,
  inputSearchStore: stores.inputSearchStore,
}))
class SearchEntryView extends React.Component<any, any> {
  static navigationOptions = {
    tabBarLabel: 'Music',
  };

  componentWillReceiveProps(props) {
    if (props.isFocused) {
      this.props.inputSearchStore.updateSearchType('entries');
    }
  }

  render() {
    if (this.props.isSearchActive) {
      return <SearchEntryList />;
    }
    return <TopRecentEntryView />;
  }
}

export default withNavigationFocus(SearchEntryView);
