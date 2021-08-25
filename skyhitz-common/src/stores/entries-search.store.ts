import { Entry } from '../models/entry.model';
import { entriesBackend } from '../backends/entries.backend';
import { observable, observe, computed } from 'mobx';
import * as L from 'list';

const debounce = require('lodash.debounce');

export class EntriesSearchStore {
  @observable searching: boolean = false;
  @observable loadingRecentSearches: boolean = false;
  @observable loadingTopSearches: boolean = false;
  @observable loadingRecentlyAdded: boolean = false;
  @observable load: boolean = false;
  @observable loadingTopChart: boolean = false;
  @observable query: string = '';
  @observable public entries: L.List<Entry> = L.from([]);
  @observable public recentSearches: L.List<Entry> = L.from([]);
  @observable public recentlyAdded: L.List<Entry> = L.from([]);
  @observable public topSearches: L.List<Entry> = L.from([]);
  @observable topChart: L.List<Entry> = L.from([]);
  disposer: any;

  @computed get active() {
    return !!this.query;
  }

  constructor(public queryObservable: any) {
    this.disposer = observe(queryObservable, ({ object }) => {
      if (object.type === 'entries' && object.q !== this.query) {
        this.query = object.q;
        this.searching = true;
        this.debouncedSearch(object.q);
      }
    });
  }

  public searchEntries(q: string) {
    return entriesBackend.search(q).then((results) => {
      let entries: Entry[] = results.map((result: any) => new Entry(result));
      this.setEntries(L.from(entries));
      this.searching = false;
    });
  }

  public debouncedSearch = debounce(this.searchEntries, 400);

  public setEntries(entries: L.List<Entry>) {
    this.entries = entries;
  }

  public setRecentSearches(entries: L.List<Entry>) {
    this.recentSearches = entries;
  }

  public setTopChart(entries: L.List<Entry>) {
    this.topChart = entries;
  }

  public setRecentlyAdded(entries: L.List<Entry>) {
    this.recentlyAdded = entries;
  }

  public setTopSearches(entries: L.List<Entry>) {
    this.topSearches = entries;
  }

  public getTopChart() {
    this.loadingTopChart = true;
    return entriesBackend.getTopChart().then((entries) => {
      this.setTopChart(L.from(entries));
      this.loadingTopChart = false;
    });
  }

  public getRecentSearches() {
    this.loadingRecentSearches = true;
    return entriesBackend.getRecentSearches().then((entries) => {
      this.setRecentSearches(L.from(entries));
      this.loadingRecentSearches = false;
    });
  }

  public getRecentlyAdded() {
    this.loadingRecentlyAdded = true;
    return entriesBackend.getRecentlyAdded().then((entries) => {
      this.setRecentlyAdded(L.from(entries));
      this.loadingRecentlyAdded = false;
    });
  }

  public getTopSearches() {
    this.loadingTopSearches = true;
    return entriesBackend.getTopSearches().then((entries) => {
      this.setTopSearches(L.from(entries));
      this.loadingTopSearches = false;
    });
  }

  public async addRecentEntrySearch(id: string) {
    await entriesBackend.addRecentEntrySearch(id);
    this.getRecentSearches();
  }
}
