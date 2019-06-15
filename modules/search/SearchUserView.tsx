import React from 'react';
import { inject } from 'mobx-react/native';
import { withNavigationFocus } from 'react-navigation';
import SearchUserList from 'app/modules/search/SearchUserList';
import TopRecentUserView from 'app/modules/search/TopRecentUserView';

@inject(stores => ({
  isSearchActive: stores.usersSearchStore.active,
  inputSearchStore: stores.inputSearchStore,
}))
class SearchUserView extends React.Component<any, any> {
  static navigationOptions = {
    tabBarLabel: 'Influencers',
  };

  componentWillReceiveProps(props) {
    if (props.isFocused) {
      this.props.inputSearchStore.updateSearchType('users');
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
