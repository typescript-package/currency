// Class.
import { Conversion } from './conversion.class';
// Type.
import { ConversionRates } from '@typedly/currency';
/**
 * @description
 * @export
 * @class Exchange
 * @template {number} Amount 
 * @template {string} [Currency=string] 
 * @template {string} [Currencies=string] 
 */
export class Exchange<
  Amount extends number,
  Currency extends string = string,
  Currencies extends string = string
> {
  /**
   * @description Link for the api for exchanges.
   * @public
   * @static
   * @readonly
   * @type {string}
   */
  public static get apiUrl(): string {
    return this.#defaultApi;
  }

  /**
   * @description Sets the api link.
   * @public
   * @static
   * @param {string} url 
   */
  public static setApiUrl(url: string): void {
    this.#defaultApi = url;
  }

  /**
   * @description
   * @static
   * @type {string}
   */
  static #defaultApi: string = '';

  /**
   * @description
   * @public
   * @returns {string} 
   */
  public get apiUrl(): string {
    return this.#apiUrl;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {number}
   */
  public get amount(): number {
    return this.#conversion.amount;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {ConversionRates<Currencies>}
   */
  public get exchangeRates(): ConversionRates<Currencies> {
    return this.#conversion.getConversionRates();
  }

  /**
   * @description
   * @param {any} apiResult 
   * @returns {ConversionRates<Currencies>} 
   */
  #adapter: (apiResult: any) => ConversionRates<Currencies> = (apiResult: any) => apiResult.conversion_rates;

  /**
   * @description
   * @type {string}
   */
  #apiUrl: string = Exchange.#defaultApi;

  /**
   * @description
   * @type {Conversion<Amount, Currency, Currencies>}
   */
  #conversion: Conversion<Amount, Currency, Currencies>;

  /**
   * Creates an instance of `Exchange`.
   * @constructor
   * @param {Amount} amount 
   * @param {Currency} currency 
   * @param {ConversionRates<Currencies>} [exchangeRates] 
   * @param {string} [apiUrl]
   */
  constructor(
    amount: Amount,
    currency: Currency,
    exchangeRates?: ConversionRates<Currencies>,
    apiUrl?: string,
    adapter?: (apiResult: any) => ConversionRates<Currencies>,
  ) {
    this.#conversion = new Conversion<Amount, Currency, Currencies>(amount, currency, exchangeRates);
    apiUrl && this.#apiUrl !== apiUrl && (this.#apiUrl = apiUrl);
    adapter && (this.#adapter = adapter);
  }

  /**
   * @description
   * @public
   * @param {Currency} [currency=this.#conversion.currency] The currency to fetch the exchange rate for.
   * @returns {Promise<Response>} 
   */
  public fetch(currency: Currency = this.#conversion.currency): Promise<Response> {
    return fetch(`${this.apiUrl}${currency}`);
  }

  /**
   * @description
   * @public
   * @async
   * @template {Currencies} FromCurrency 
   * @param {FromCurrency} currency 
   * @param {Amount} [amount=this.#conversion.amount] 
   * @returns {Promise<number>} 
   */
  public async from<FromCurrency extends Currencies>(
    currency: FromCurrency,
    amount: Amount = this.#conversion.amount
  ): Promise<number> {
    return this.onFetch(conversion => conversion.from(currency, amount));
  }

  /**
   * @description
   * @public
   * @async
   * @template {Currencies} FromCurrencies 
   * @param {FromCurrencies} currencies 
   * @param {Amount} [amount=this.#conversion.amount] 
   * @returns {Promise<number>} 
   */
  public async fromMany<FromCurrencies extends Currencies>(
    currencies: FromCurrencies[],
    amount: Amount = this.#conversion.amount
  ): Promise<ConversionRates<FromCurrencies>> {
    return this.onFetch(conversion => conversion.fromMany(currencies, amount));
  }

  /**
   * @description
   * @public
   * @async
   * @template {Currencies} ToCurrency 
   * @param {ToCurrency} currency 
   * @param {Amount} [amount=this.#conversion.amount] 
   * @returns {unknown} 
   */
  public async to<ToCurrency extends Currencies>(
    currency: ToCurrency,
    amount: Amount = this.#conversion.amount
  ): Promise<number> {
    return this.onFetch(conversion => conversion.to(currency, amount));
  }

  /**
   * @description
   * @public
   * @async
   * @template {Currencies} ToCurrencies 
   * @param {ToCurrencies[]} currencies 
   * @param {Amount} [amount=this.#conversion.amount] 
   * @returns {Promise<ConversionRates<ToCurrencies>>} 
   */
  public async toMany<ToCurrencies extends Currencies>(
    currencies: ToCurrencies[],
    amount: Amount = this.#conversion.amount
  ): Promise<ConversionRates<ToCurrencies>> {
    return this.onFetch(conversion => conversion.toMany(currencies, amount));
  }
    
  /**
   * @description
   * @public
   * @async
   * @returns {Promise<this>} 
   */
  public async updateExchangeRates(): Promise<this> {
    try {
      if (this.#apiUrl.length > 0) {
        const result = await this.fetch(this.#conversion.currency);
        result.ok && await result
          .json()
          .then(data => this.#conversion.setConversionRates(this.#adapter(data)));
      }
    } catch(reason) {
      throw reason;
    }
    return this;
  }

  /**
   * @description
   * @private
   * @async
   * @template T 
   * @param {(conversion: Conversion<Amount, Currency, Currencies>) => T} callbackFn 
   * @returns {Promise<T>} 
   */
  private async onFetch<T>(
    callbackFn: (conversion: Conversion<Amount, Currency, Currencies>) => T
  ): Promise<T> {
    return (await this.updateExchangeRates(), callbackFn(this.#conversion));
  }
}
