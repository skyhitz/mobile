import { observable } from 'mobx';
import { paymentsBackend } from '../backends/payments.backend';
import { Set } from 'immutable';
import { entriesBackend } from '../backends/entries.backend';

export class PaymentsStore {
  @observable ids: Set<string> = Set([]);
  @observable
  subscribed: boolean = false;
  @observable
  subscriptionLoaded: boolean = false;
  @observable
  credits: number = 0;
  @observable
  submittingSubscription: boolean = false;
  @observable
  submittingWithdraw: boolean;

  constructor() {}

  async subscribeUser(cardToken: string) {
    this.submittingSubscription = true;
    await paymentsBackend.subscribe(cardToken);
    this.submittingSubscription = false;
    this.subscribed = true;
    return true;
  }

  async refreshSubscription() {
    let { subscribed, credits } = await paymentsBackend.refreshSubscription();
    this.subscribed = subscribed;
    this.credits = credits;
    this.subscriptionLoaded = true;
  }

  async withdrawToExternalWallet(
    withdrawAddress: string,
    creditsToWithdraw: number
  ) {
    this.submittingWithdraw = true;
    await paymentsBackend.withdrawToExternalWallet(
      withdrawAddress,
      creditsToWithdraw
    );
    await this.refreshSubscription();
    this.submittingWithdraw = false;
  }

  public async buyEntry(id: string) {
    await entriesBackend.buyEntry(id);
  }
}
