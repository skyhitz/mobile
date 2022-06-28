import { observable } from 'mobx';
import * as L from 'list';
import { entriesBackend } from '../api/entries';
import { Entry } from '../models';
import { SessionStore } from './session.store';

export class UserEntriesStore {
  @observable entries: L.List<Entry> = L.from([]);
  @observable loading: boolean = false;

  constructor(private sessionStore: SessionStore) {}

  public async refreshEntries() {
    if (!this.sessionStore.user) {
      return;
    }
    if (!this.sessionStore.user.id) {
      return;
    }
    this.loading = true;

    const entries = await entriesBackend.getByUserId(this.sessionStore.user.id);
    this.loading = false;
    this.entries = L.from(entries ? entries : []);
  }

  get entriesCount() {
    return this.entries ? this.entries.length : 0;
  }
}
