import { observable } from 'mobx';
import { User, Entry } from '../models';
import { List } from 'immutable';
import { entriesBackend } from '../backends/entries.backend';

export class ProfileStore {
  @observable user: User;
  @observable entries: List<Entry> = List([]);
  @observable loadingEntries: boolean = false;
  constructor (
  ) {
  }

  public async getProfileInfo(user: User) {
    this.user = user;
    return this.getUserEntries(user.id);
  }

  public async getUserEntries(userId: string) {
    this.loadingEntries = true;
    this.entries = List([]);
    const entries = await entriesBackend.getByUserId(userId);
    this.loadingEntries = false;
    return this.setEntries(List(entries));
  }

  public setEntries(entries: List<Entry>) {
    return this.entries = entries;
  }

}



