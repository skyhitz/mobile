import { NavigationActions, StackActions } from 'react-navigation';

export const instance: any = {};

export function setNavigator(nav: any) {
  if (nav) {
    return (instance.navigator = nav);
  }
}

export async function navigate(routeName: any, params?: any) {
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
