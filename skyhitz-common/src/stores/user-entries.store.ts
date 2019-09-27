import { observable } from 'mobx';
import { List } from 'immutable';
import { entriesBackend } from '../backends/entries.backend';
import { Entry } from '../models';
import { SessionStore } from './session.store';

export class UserEntriesStore {
  @observable entries: List<Entry> = List([]);
  @observable loading: boolean = false;

  constructor(private sessionStore: SessionStore) {}

  public async refreshEntries() {
    this.loading = true;
    const entries = await entriesBackend.getByUserId(this.sessionStore.user.id);
    this.loading = false;
    this.entries = List(entries);
  }

  get entriesCount() {
    return this.entries.size;
  }

}
