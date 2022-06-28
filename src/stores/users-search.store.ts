import { User } from '../models/user.model';
import { usersBackend } from '../api/users';
import { observable, observe, computed } from 'mobx';
import * as L from 'list';
const debounce = require('lodash.debounce');

export class UsersSearchStore {
  @observable public users: L.List<User> = L.from([]);
  @observable public recentSearches: L.List<User> = L.from([]);
  @observable public topSearches: L.List<User> = L.from([]);
  @observable searching: boolean = false;
  @observable loadingRecentSearches: boolean = false;
  @observable loadingTopSearches: boolean = false;
  @observable query: string = '';
  disposer: any;
  @computed get active() {
    return !!this.query;
  }

  constructor(public queryObservable: any) {
    this.disposer = observe(queryObservable, ({ object }) => {
      if (object.type === 'users' && object.q !== this.query) {
        this.query = object.q;
        this.searching = true;
        this.searchUsers(object.q);
      }
    });
  }

  public searchUsers(q: string) {
    usersBackend.search(q).then((users) => {
      this.setUsers(L.from(users));
      this.searching = false;
    });
  }

  public debouncedSearch = debounce(this.searchUsers, 400);

  public setUsers(users: L.List<User>) {
    this.users = users;
  }

  public setRecentSearches(users: L.List<User>) {
    this.recentSearches = users;
  }

  public setTopSearches(users: L.List<User>) {
    this.topSearches = users;
  }

  public getRecentSearches() {
    this.loadingRecentSearches = true;
    return usersBackend.getRecentSearches().then((users) => {
      this.setRecentSearches(L.from(users));
      this.loadingRecentSearches = false;
    });
  }

  public getTopSearches() {
    this.loadingTopSearches = true;
    return usersBackend.getTopSearches().then((users) => {
      this.setTopSearches(L.from(users));
      this.loadingTopSearches = false;
    });
  }
}
