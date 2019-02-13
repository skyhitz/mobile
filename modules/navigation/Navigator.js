/**
 * @providesModule navigator
 * @flow
 */

import { NavigationActions, StackActions } from 'react-navigation';

const instance = {};

export function setNavigator(nav) {
  if (nav) {
    return (instance.navigator = nav);
  }
}

export async function navigate(routeName, params) {
  if (instance.navigator && routeName) {
    let action = NavigationActions.navigate({ routeName, params });
    return instance.navigator.dispatch(action);
  }
}

export function goBack() {
  if (instance.navigator) {
    let action = NavigationActions.back({});
    instance.navigator.dispatch(action);
  }
}

export function popToTop() {
  instance.navigator.dispatch(StackActions.popToTop());
}
