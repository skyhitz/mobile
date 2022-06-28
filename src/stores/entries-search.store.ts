import { Entry } from '../models/entry.model';
import { entriesBackend } from '../api/entries';
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
  @observable public recentlyAdded: Entry[] = [];
  @observable public hasMoreRecentlyAdded = true;
  @observable topChart: Entry[] = [];
  @observable public hasMoreTopChart = true;
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

  public setTopChart(entries: Entry[]) {
    this.topChart = entries;
  }

  public setRecentlyAdded(entries: Entry[]) {
    this.recentlyAdded = entries;
  }

  public getTopChart() {
    this.loadingTopChart = true;
    return entriesBackend.getTopChart().then((entries) => {
      this.setTopChart(entries);
      this.loadingTopChart = false;
    });
  }

  public loadMoreTopChart(page: number) {
    this.loadingTopChart = true;
    return entriesBackend.getTopChart(page).then((entries) => {
      if (entries.length == 0) {
        this.hasMoreTopChart = false;
        this.loadingTopChart = false;
        return;
      }
      this.setTopChart([...this.topChart, ...entries]);
      this.loadingTopChart = false;
      return this.topChart;
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
      this.setRecentlyAdded(entries);
      this.loadingRecentlyAdded = false;
      return this.recentlyAdded;
    });
  }

  public loadMoreRecentlyAdded(page: number) {
    this.loadingRecentlyAdded = true;
    return entriesBackend.getRecentlyAdded(page).then((entries) => {
      if (entries.length == 0) {
        this.hasMoreRecentlyAdded = false;
        this.loadingRecentlyAdded = false;
        return;
      }
      this.setRecentlyAdded([...this.recentlyAdded, ...entries]);
      this.loadingRecentlyAdded = false;
      return this.recentlyAdded;
    });
  }
}
