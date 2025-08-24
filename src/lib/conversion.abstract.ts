// Class.
import { CurrencyValue } from './currency-value.class';
// Type.
import { ConversionRates } from '@typedly/currency';
/**
 * @description
 * @export
 * @abstract
 * @class Conversion
 * @template {number} Amount 
 * @template {string} FromCurrency 
 * @template {string} [Currencies=string] 
 */
export abstract class Conversion<
  Amount extends number,
  FromCurrency extends string,
  Currencies extends string = string
> {
  /**
   * Link for your api
   */
  public static get api(): string {
    return this.#api;
  }

  /**
   * @description 
   * @public
   * @static
   * @param {string} api 
   */
  public static setApi(api: string): void {
    this.#api = api;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {Amount}
   */
  public get amount(): Amount {
    return this.#amount;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {FromCurrency}
   */
  public get fromCurrency(): FromCurrency {
    return this.#fromCurrency;
  }

  /**
   * @description
   * @static
   * @type {string}
   */
  static #api: string = `https://api.exchangerate-api.com/v4/latest/`;

  /**
   * @description
   * @type {Amount}
   */
  #amount: Amount;

  /**
   * @description
   * @type {FromCurrency}
   */
  #fromCurrency: FromCurrency;

  /**
   * @description
   * @type {Map<Currencies, Amount>}
   */
  #conversionRate: Map<Currencies, Amount> = new Map();

  /**
   *
   * @param amount
   * @param fromCurrency
   * @param conversionRate
   * @angularpackage
   */
  constructor(
    amount: Amount,
    fromCurrency: FromCurrency,
    conversionRate?: ConversionRates<Currencies>
  ) {
    this.#amount = amount;
    this.#fromCurrency = fromCurrency;
    this.setConversionRates(conversionRate);
  }

  /**
   *
   * @param amount
   * @returns
   * @angularpackage
   */
  public setAmount(amount: Amount): this {
    this.#amount = amount;
    return this;
  }

  /**
   *
   * @param currency
   * @returns
   * @angularpackage
   */
  public to<ToCurrency extends Currencies>(
    currency: ToCurrency
  ): `${ToCurrency} ${number}` {
    const conversionRate = this.#conversionRate.get(currency);
    return this.#conversionRate.has(currency)
      ? new CurrencyValue(
        typeof conversionRate === 'number'
          ? this.#amount / conversionRate
          : 1,
        currency
      ).withCurrency
      : new CurrencyValue(this.#amount * 1, currency).withCurrency;
  }

  /**
   * TODO: convert to All.
   * @param currencies
   * @returns
   * @angularpackage
   */
  public toMany<ToCurrencies extends Currencies>(
    onSuccess: (exchanged: ConversionRates<ToCurrencies>) => any,
    onReject: (reason: any) => PromiseLike<never>,
    ...currencies: ToCurrencies[]
  ): this {
    // Prepare exchanged.
    const exchanged: ConversionRates<ToCurrencies> = {} as any;
    // Fetch from api specific currency.
    this.fetch(
      this.#fromCurrency,
      (result) => {
        // Set conversion rats into the object.
        this.setConversionRates(result.rates || result.conversion_rates);
        // Convert.
        currencies.forEach((currency) =>
          Object.assign(exchanged, {
            [currency]: this.to(currency),
          })
        );
        onSuccess(exchanged);
      },
      onReject
    );
    return this;
  }

  /**
   * @description
   * @private
   * @param {FromCurrency} fromCurrency 
   * @param {?((value: any) => any) | null | undefined} [onSuccess] 
   * @param {?((reason: any) => PromiseLike<never>) | null | undefined} [onReject] 
   */
  private fetch(
    fromCurrency: FromCurrency,
    onSuccess?: ((value: any) => any) | null | undefined,
    onReject?: ((reason: any) => PromiseLike<never>) | null | undefined
  ): void {
    fetch(`${Conversion.api}${fromCurrency}`)
      .then((currency) => currency.json())
      .then(onSuccess, onReject);
  }

  /**
   * @description
   * @private
   * @param {?ConversionRates<Currencies>} [conversionRates] 
   * @returns {*} 
   */
  private setConversionRates(
    conversionRates?: ConversionRates<Currencies>
  ): any {
    typeof conversionRates === 'object' &&
      (Object.keys(conversionRates) as Currencies[]).forEach(
        (conversionCurrency) => {
          const conversionRate = conversionRates[conversionCurrency];
          typeof conversionRate === 'number' &&
            conversionRate > 0 &&
            this.#conversionRate.set(conversionCurrency, conversionRate as Amount);
        }
      );
  }
}
