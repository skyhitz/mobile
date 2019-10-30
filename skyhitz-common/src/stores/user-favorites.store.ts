import { observable, observe, IObservableObject } from 'mobx';
import { paymentsBackend } from '../backends/payments.backend';
import { userFavoritesBackend } from '../backends/user-favorites.backend';
import { Set, List } from 'immutable';
import { Entry, User } from '../models';
import { PaymentsStore } from './payments.store';

export class UserFavoritesStore {
  @observable ids: Set<string> = Set([]);
  @observable
  counter: number = 0;
  timeout: any;
  @observable entry: Entry;
  @observable userFavorites: List<Entry> = List([]);
  @observable
  creditsSent: number = 0;
  @observable
  totalCredits: number = 0;
  @observable
  availableToCredit: boolean;

  constructor(
    public observables: IObservableObject,
    public paymentsStore: PaymentsStore
  ) {}

  get isFavorited() {
    if (!this.entry) {
      return false;
    }
    return this.ids.has(this.entry.id);
  }

  public disposer = observe(this.observables, ({ object }) => {
    if (!object.entry) {
      return;
    }
    this.entry = object.entry;
    this.updateFavorite(this.entry);
    this.canCreditEntry(this.entry.id);
  });

  async canCreditEntry(id: string) {
    const available = await userFavoritesBackend.canCreditEntry(id);
    this.availableToCredit = !!available;
  }

  addToFavorites(entry: Entry) {
    if (this.ids.has(entry.id)) {
      return;
    }
    this.ids = this.ids.add(entry.id);
    this.userFavorites = this.userFavorites.push(entry);
  }

  async updateFavorite(entry: Entry) {
    let { credits, totalCredits } = await userFavoritesBackend.isFavorited(entry.id);
    if (credits) {
      this.addToFavorites(entry);
    }
    this.creditsSent = credits;
    this.totalCredits = totalCredits;
  }

  async sendCredits(entry: Entry) {
    const amount = this.counter;
    clearTimeout(this.timeout);
    this.timeout = null;
    this.counter = 0;
    const credited = await userFavoritesBackend.creditEntry(entry.id, amount);
    this.paymentsStore.refreshSubscription();
    if (!credited) {
      this.creditsSent = this.creditsSent - this.counter;
      this.totalCredits = this.totalCredits - this.counter;
      return;
    }

    this.addToFavorites(entry);
  }

  async sendCredit(entry: Entry) {
    this.creditsSent = this.creditsSent + 1;
    this.totalCredits = this.totalCredits + 1;
    this.counter = this.counter + 1;
    if (!this.timeout) {
      this.timeout = setTimeout(() => this.sendCredits(entry), 5000);
    }
  }
}
