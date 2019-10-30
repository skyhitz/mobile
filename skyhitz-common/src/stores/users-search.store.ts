import { User } from '../models/user.model';
import { usersBackend } from '../backends/users.backend';
import { observable, observe, computed } from 'mobx';
import { List } from 'immutable';
const debounce = require('lodash.debounce');

export class UsersSearchStore {
  @observable public users: List<User> = List([]);
  @observable public recentSearches: List<User> = List([]);
  @observable public topSearches: List<User> = List([]);
  @observable searching: boolean = false;
  @observable loadingRecentSearches: boolean = false;
  @observable loadingTopSearches: boolean = false;
  @observable query: string = '';
  @computed get active () {
    return !!this.query;
  }

  constructor (
    public queryObservable: any
  ) {
  }

  public disposer = observe(this.queryObservable, ({ object }) => {
    if (object.type === 'users' && object.q !== this.query) {
      this.query = object.q;
      this.searching = true;
      this.searchUsers(object.q);
    }
  });

  public searchUsers(q: string) {
    usersBackend.search(q)
      .then(users => {
        this.setUsers(List(users));
        this.searching = false;
      });
  }

  public debouncedSearch = debounce(this.searchUsers, 400);

  public setUsers(users: List<User>) {
    this.users = users;
  }

  public setRecentSearches(users: List<User>) {
    this.recentSearches = users;
  }

  public setTopSearches(users: List<User>) {
    this.topSearches = users;
  }

  public getRecentSearches() {
    this.loadingRecentSearches = true;
    return usersBackend.getRecentSearches()
      .then(users => {
        this.setRecentSearches(List(users));
        this.loadingRecentSearches = false;
      });
  }

  public getTopSearches() {
    this.loadingTopSearches = true;
    return usersBackend.getTopSearches()
      .then(users => {
        this.setTopSearches(List(users));
        this.loadingTopSearches = false;
      });
  }

  public async addRecentUserSearch(id: string) {
    await usersBackend.addRecentUserSearch(id);
    this.getRecentSearches();
  }

}



