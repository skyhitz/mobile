import { observable } from 'mobx';
import { paymentsBackend } from '../backends/payments.backend';
import { entriesBackend } from '../backends/entries.backend';
import { Config } from '../config';

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

  @observable
  entryPrices: Map<string, { price: number; amount: number }> = new Map();

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
    return await entriesBackend.buyEntry(id, amount, price);
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

  public async fetchPriceFromHorizon(code: string, issuer: string) {
    let { asks } = await fetch(
      `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`
    ).then((res: any) => res.json());

    if (asks && asks[0]) {
      let { price, amount }: { price: string; amount: string } = asks[0];
      return { price: parseFloat(price), amount: parseFloat(amount) };
    }

    return null;
  }

  public async fetchAndCachePrice(code: string, issuer: string) {
    const identifier = `${code}-${issuer}`;
    const val = this.entryPrices.get(identifier);
    if (val) {
      return val;
    }
    const newval = await this.fetchPriceFromHorizon(code, issuer);
    if (newval) {
      this.entryPrices.set(identifier, newval);
      return newval;
    }
    return { price: 0, amount: 0 };
  }
}
