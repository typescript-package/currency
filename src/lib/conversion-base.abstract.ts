// Abstract.
import { ConversionCore } from './conversion-core.abstract';
// Class.
import { CurrencyValue } from './currency-value.class';
// Type.
import { ConversionRates } from '@typedly/currency';
/**
 * @description The base abstraction for currency conversion.
 * @export
 * @abstract
 * @class Conversion
 * @template {number} Amount The type of amount.
 * @template {string} Currencies The type of currency.
 * @template {string} [Currencies=string] The type of currencies.
 */
export abstract class ConversionBase<
  Amount extends number,
  Currency extends string = string,
  Currencies extends string = string
> extends ConversionCore<Amount, Currency, Currencies> {
  /**
   * @inheritdoc 
   */
  public get amount(): Amount {
    return this.#amount;
  }

  /**
   * @inheritdoc 
   */
  public get currencies(): Currencies[] {
    return Array.from(this.conversionRates.keys()) as Currencies[];
  }

  /**
   * @inheritdoc 
   */
  public get currency(): Currency {
    return this.#currency;
  }

  /**
   * @description Privately stored amount to convert.
   * @type {Amount}
   */
  // #amount: Amount;
  #amount: Amount;

  /**
   * @description Privately stored currency.
   * @type {Currency}
   */
  #currency: Currency;

  /**
   * Creates an instance of `Conversion` child class.
   * @constructor
   * @param {Amount} amount The amount for conversion.
   * @param {Currency} currency The currency for the conversion rates.
   * @param {?ConversionRates<Currencies>} [conversionRates] The conversion rates for base currency.
   */
  constructor(
    amount: Amount,
    currency: Currency,
    conversionRates?: ConversionRates<Currencies>,
  ) {
    super(conversionRates);
    this.#amount = amount;
    this.#currency = currency;
  }

  /**
   * @inheritdoc
   */
  public from(
    currency: Currencies,
    amount: Amount = this.amount
  ): number {
    return new CurrencyValue(
      amount / super.conversionRates.get(currency)!,
      this.currency
    ).of;
  }

  /**
   * @description Converts the base or specified amount from the given currencies to the base currency.
   * @public
   * @template {Currencies} FromCurrencies
   * @param {FromCurrencies[]} currencies The currencies to convert from to base currency.
   * @param {Amount} [amount=this.amount] Optional amount to convert.
   * @returns {ConversionRates<FromCurrencies>}
   */
  public fromMany<FromCurrencies extends Currencies>(
    currencies: FromCurrencies[],
    amount: Amount = this.amount
  ): ConversionRates<FromCurrencies> {
    return currencies.reduce((acc, currency) => (
      acc[currency] = this.from(currency, amount),
      acc
    ), {} as ConversionRates<FromCurrencies>);
  }

  /**
   * @description Sets the amount to convert.
   * @public
   * @param {Amount} amount The amount to convert.
   * @returns {this} The instance of the conversion class.
   */
  public setAmount(amount: Amount): this {
    this.#amount = amount;
    return this;
  }

  /** 
   * @inheritdoc
   */
  public to<ToCurrency extends Currencies>(
    currency: ToCurrency,
    amount: Amount = this.amount
  ): number {
    return new CurrencyValue(
      this.conversionRates.has(currency)
        ? amount * this.conversionRates.get(currency)!
        : amount * 1,
      currency
    ).of;
  }

  /**
   * @description Converts the base or specified amount of the base currency to the given currencies.
   * @public
   * @template {Currencies} ToCurrencies
   * @param {ToCurrencies[]} currencies The currencies to convert base currency to.
   * @returns {ConversionRates<ToCurrencies>}
   */
  public toMany<ToCurrencies extends Currencies>(
    currencies: ToCurrencies[],
    amount: Amount = this.amount
  ): ConversionRates<ToCurrencies> {
    return currencies.reduce((acc, currency) => (
      acc[currency] = this.to(currency, amount),
      acc
    ), {} as ConversionRates<ToCurrencies>);
  }
}
