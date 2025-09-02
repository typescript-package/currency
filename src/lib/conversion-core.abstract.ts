// Type.
import { ConversionRates } from '@typedly/currency';
/**
 * @description The core abstraction for currency conversion.
 * @export
 * @abstract
 * @class ConversionCore
 * @template {number} Amount The type of the amount to convert.
 * @template {string} Currency The type of the currency to convert from or to.
 * @template {string} [Currencies=string] The type of the currencies to convert from or to.
 */
export abstract class ConversionCore<
  Amount extends number,
  Currency extends string = string,
  Currencies extends string = string
> {
  /**
   * @description Gets the default conversion rates for the base currency.
   * @public
   * @static
   * @readonly
   * @type {Map<string, number>}
   */
  public static get conversionRates() {
    return this.defaultConversionRates;
  }

  /**
   * @description Gets the conversion rates for the base currency.
   * @public
   * @static
   * @template {string} [Currencies=string] 
   * @returns {ConversionRates<Currencies>} 
   */
  public static getConversionRates<
    Currencies extends string = string
  >(): ConversionRates<Currencies> {
    return (Array.from(this.defaultConversionRates.entries()) as [keyof ConversionRates<Currencies>, number][]).reduce(
      (acc, [currency, rate]) => (acc[currency] = rate, acc), {} as ConversionRates<Currencies>
    );
  }

  /**
   * @description Sets the conversion rates for the base currency.
   * @public
   * @static
   * @template {string} [Currencies=string] 
   * @param {ConversionRates<Currencies>} conversionRates 
   * @param {?(value: Currencies, index: number, array: Currencies[]) => void} [forEachFn] 
   * @returns {typeof ConversionCore} 
   */
  public static setConversionRates<Currencies extends string = string>(conversionRates: ConversionRates<Currencies>): typeof ConversionCore {
    (Object.keys(conversionRates) as Currencies[]).forEach(
      currency => typeof conversionRates[currency] !== 'undefined' && this.defaultConversionRates.set(currency, conversionRates[currency])
    );
    return this;
  } 

  /**
   * @description Privately stored the default conversion rates.
   * @static
   * @type {Map<string, number>}
   */
  private static defaultConversionRates: Map<string, number> = new Map();

  /**
   * @description Gets the amount to convert.
   * @abstract
   * @readonly
   * @type {Amount}
   */
  abstract get amount(): Amount;

  /**
   * @description Gets the list of currencies for the conversion rates.
   * @abstract
   * @readonly
   * @type {Currencies[]}
   */
  abstract get currencies(): Currencies[];

  /**
   * @description Gets the base currency to convert from or to.
   * @public
   * @readonly
   * @type {Currency}
   */
  abstract get currency(): Currency;

  /**
   * @description Returns `Map` of the conversion rates for the base currency.
   * @public
   * @readonly
   * @type {Map<string, number>}
   */
  public get conversionRates(): Map<Currencies, number> {
    return this.#conversionRates;
  }

  /**
   * @description Privately stored conversion rates.
   * @type {Map<Currencies, number>}
   */
  #conversionRates: Map<Currencies, number> = new Map();

  /**
   * Creates an instance of `Conversion` child class.
   * @constructor
   * @param {ConversionRates<string>} [conversionRates] 
   */
  constructor(conversionRates: ConversionRates<Currencies> = ConversionCore.getConversionRates<Currencies>()) {
    this.setConversionRates(conversionRates);
  }

  /**
   * @description Converts the specified amount from the given currency to the base currency.
   * @public
   * @param {Currencies} currency The currency from which to convert to base currency.
   * @param {Amount} [amount=this.amount] The amount to convert to the base currency.
   * @returns {number} 
   */
  abstract from(currency: Currencies, amount: Amount): number;

  /** 
   * @description Gets the conversion rates as an object.
   * @public
   * @returns {ConversionRates<Currencies>} The conversion rates object.
   */
  public getConversionRates(): ConversionRates<Currencies> {
    return Array.from(this.conversionRates.entries()).reduce((acc, [currency, rate]) => (
      acc[currency] = rate,
      acc
    ), {} as ConversionRates<Currencies>);
  }

  /**
   * @description Sets the amount to convert.
   * @abstract
   * @param {Amount} amount The amount to convert.
   * @returns {this} The instance of the class.
   */
  abstract setAmount(amount: Amount): this;

  /**
   * @description Sets the conversion rates for the base currency.
   * @public
   * @param {ConversionRates<Currencies>} [conversionRates] The object with the rates.
   * @returns {this} The instance of the class.
   */
  public setConversionRates(conversionRates: ConversionRates<Currencies>): this {
    (Object.keys(conversionRates) as Currencies[]).forEach(currency => typeof conversionRates[currency] !== 'undefined' &&
      this.#conversionRates.set(currency, conversionRates[currency]));
    return this;
  }

  /**
   * @description Converts the base or specified amount of the base currency to the given currency.
   * @abstract
   * @template {Currencies} ToCurrency The type of currency to convert to.
   * @param {ToCurrency} currency The currency to convert to base currency.
   * @param {Amount} [amount=this.amount] Optional amount to convert to the given currency.
   * @returns {number} The converted amount.
   */
  abstract to<ToCurrency extends Currencies>(currency: ToCurrency, amount: Amount): number;
}
