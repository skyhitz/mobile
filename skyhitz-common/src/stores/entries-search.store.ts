import { Entry } from '../models/entry.model';
import { entriesBackend } from '../backends/entries.backend';
import { observable, observe, computed } from 'mobx';
import { List } from 'immutable';
const debounce = require('lodash.debounce');

export class EntriesSearchStore {
  @observable searching: boolean = false;
  @observable loadingRecentSearches: boolean = false;
  @observable loadingTopSearches: boolean = false;
  @observable loadingRecentlyAdded: boolean = false;
  @observable query: string = '';
  @observable public entries: List<Entry> = List([]);
  @observable public recentSearches: List<Entry> = List([]);
  @observable public recentlyAdded: List<Entry> = List([]);
  @observable public topSearches: List<Entry> = List([]);
  @computed get active() {
    return !!this.query;
  }

  constructor(public queryObservable: any) {}

  public disposer = observe(this.queryObservable, ({ object }) => {
    if (object.type === 'entries' && object.q !== this.query) {
      this.query = object.q;
      this.searching = true;
      this.debouncedSearch(object.q);
    }
  });

  public searchEntries(q: string) {
    return entriesBackend.search(q).then(results => {
      let entries: Entry[] = results.map((result: any) => new Entry(result));
      this.setEntries(List(entries));
      this.searching = false;
    });
  }

  public debouncedSearch = debounce(this.searchEntries, 400);

  public setEntries(entries: List<Entry>) {
    this.entries = entries;
  }

  public setRecentSearches(entries: List<Entry>) {
    this.recentSearches = entries;
  }

  public setRecentlyAdded(entries: List<Entry>) {
    this.recentlyAdded = entries;
  }

  public setTopSearches(entries: List<Entry>) {
    this.topSearches = entries;
  }

  public getRecentSearches() {
    this.loadingRecentSearches = true;
    return entriesBackend.getRecentSearches().then(entries => {
      this.setRecentSearches(List(entries));
      this.loadingRecentSearches = false;
    });
  }

  public getRecentlyAdded() {
    this.loadingRecentlyAdded = true;
    return entriesBackend.getRecentlyAdded().then(entries => {
      this.setRecentlyAdded(List(entries));
      this.loadingRecentlyAdded = false;
    });
  }

  public getTopSearches() {
    this.loadingTopSearches = true;
    return entriesBackend.getTopSearches().then(entries => {
      this.setTopSearches(List(entries));
      this.loadingTopSearches = false;
    });
  }

  public async addRecentEntrySearch(id: string) {
    await entriesBackend.addRecentEntrySearch(id);
    this.getRecentSearches();
  }
}
