import { observable } from 'mobx';
import { paymentsBackend } from '../backends/payments.backend';
import { entriesBackend } from '../backends/entries.backend';

export class PaymentsStore {
  @observable
  subscribed: boolean = false;
  @observable
  subscriptionLoaded: boolean = false;
  @observable
  credits: number = 0;
  @observable
  submittingSubscription: boolean = false;
  @observable
  submittingWithdraw: boolean = false;
  @observable
  loadingBalance: boolean = false;
  @observable
  xlmPrice: number = 0;

  constructor() {}

  setLoadingBalance(loading: boolean) {
    this.loadingBalance = loading;
  }

  setSubmittingSubscription(submitting) {
    this.submittingSubscription = submitting;
  }

  async subscribeUser(cardToken: string) {
    this.submittingSubscription = true;
    await paymentsBackend.subscribe(cardToken);
    this.submittingSubscription = false;
    this.subscribed = true;
    return true;
  }

  async buyCredits(cardToken: string, amount: number) {
    this.submittingSubscription = true;
    await paymentsBackend.buyCredits(cardToken, amount);
    this.submittingSubscription = false;
    this.subscribed = true;
    return true;
  }

  async refreshSubscription() {
    this.loadingBalance = true;
    let { subscribed, credits } = await paymentsBackend.refreshSubscription();
    this.subscribed = subscribed;
    this.credits = credits;
    this.subscriptionLoaded = true;
    this.loadingBalance = false;
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

  public async buyEntry(id: string, amount: number, price: number) {
    await entriesBackend.buyEntry(id, amount, price);
  }

  public getPriceInfo(id: string) {
    return entriesBackend.getPriceInfo(id);
  }

  get xlmPriceWithFees() {
    return this.xlmPrice * 1.06;
  }

  public async refreshXLMPrice() {
    const price = await paymentsBackend.getXLMPrice();

    this.xlmPrice = parseFloat(price);
  }
}
