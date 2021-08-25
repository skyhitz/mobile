import { observable } from 'mobx';
import { User, Entry } from '../models';
import * as L from 'list';
import { entriesBackend } from '../backends/entries.backend';

export class ProfileStore {
  @observable
  user!: User;
  @observable entries: L.List<Entry> = L.from([]);
  @observable loadingEntries: boolean = false;
  constructor() {}

  public async getProfileInfo(user: User) {
    if (!user) return;
    this.user = user;
    return this.getUserEntries(user.id as string);
  }

  public async getUserEntries(userId: string) {
    this.loadingEntries = true;
    this.entries = L.from([]);
    const entries = await entriesBackend.getByUserId(userId);
    this.loadingEntries = false;
    return this.setEntries(L.from(entries));
  }

  public setEntries(entries: L.List<Entry>) {
    return (this.entries = entries);
  }
}
