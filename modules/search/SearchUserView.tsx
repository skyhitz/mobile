import React from 'react';
import { inject } from 'mobx-react';
import { withNavigationFocus } from '@react-navigation/compat';
import SearchUserList from 'app/modules/search/SearchUserList';
import TopRecentUserView from 'app/modules/search/TopRecentUserView';
import * as stores from 'app/skyhitz-common';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  isSearchActive: stores.usersSearchStore.active,
  inputSearchStore: stores.inputSearchStore,
}))
class SearchUserView extends React.Component<any, any> {
  state = {};
  static navigationOptions = {
    tabBarLabel: 'Influencers',
  };

  static async getDerivedStateFromProps(props: any) {
    if (props.isFocused) {
      props.inputSearchStore.updateSearchType('users');
    }
  }

  render() {
    if (this.props.isSearchActive) {
      return <SearchUserList />;
    }
    return <TopRecentUserView />;
  }
}

export default withNavigationFocus(SearchUserView);
