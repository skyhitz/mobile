// @generated: @expo/next-adapter@2.0.6
import React from 'react';
import WebApp from 'app/modules/marketing/web/Home';
import { loadResourcesAsync } from 'app/functions/LoadResourcesAsync';

export default class App extends React.Component {
  async componentDidMount() {
    await loadResourcesAsync();
  }

  render() {
    return <WebApp />;
  }
}
