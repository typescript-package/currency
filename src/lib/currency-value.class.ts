// Range.
import { Number } from '@typescript-package/range';
// Type.
import { ValueWithCurrency } from '@typedly/currency';
// Interface.
import { CurrencyValueOptions } from '@typedly/currency';
/**
 * @description
 * @export
 * @class CurrencyValue
 * @template {number} [Value=number] 
 * @template {string} [Currency=string] 
 * @template {string} [Currencies=string] 
 * @extends {Number<Value>}
 */
export class CurrencyValue<
  Value extends number = number,
  Currency extends string = string,
  Currencies extends string = string
> extends Number<Value> {
  /**
   * @description
   * @public
   * @static
   * @type {string}
   */
  public static locales: string = navigator.language;

  /**
   * @description The maximum fraction digits.
   * @public
   * @static
   * @type {number}
   */
  public static maximumFractionDigits: number = 2;

  /**
   * @description The minimum fraction digits.
   * @public
   * @static
   * @type {number}
   */
  public static minimumFractionDigits: number = 2;

  /**
   * @description The currency.
   * @public
   * @readonly
   * @type {Currency}
   */
  public get currency(): Currency {
    return this.#currency;
  }

  /**
   * @description Currency symbol.
   * @public
   * @readonly
   * @type {string}
   */
  public get currencySymbol(): string {
    return CurrencyValue.extractCurrencySymbol(this.withCurrency);
  }

  /**
   * @description Fraction digits.
   * @public
   * @readonly
   * @type {{
   *     maximum?: number;
   *     minimum?: number;
   *   }}
   */
  public get fractionDigits(): {
    maximum?: number;
    minimum?: number;
  } {
    return {
      maximum: this.#maximumFractionDigits,
      minimum: this.#minimumFractionDigits,
    };
  }

  /**
   * @description The locales.
   * @public
   * @readonly
   * @type {(string | undefined)}
   */
  public get locales(): string | undefined {
    return this.#locales;
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {CurrencyValueOptions}
   */
  public get resolvedOptions(): CurrencyValueOptions {
    return {
      locales: this.#locales,
      maximumFractionDigits: this.#maximumFractionDigits,
      minimumFractionDigits: this.#minimumFractionDigits,
    };
  }

  /**
   * @description
   * @public
   * @readonly
   * @type {string}
   */
  public get formatted(): string {
    return CurrencyValue.format(this.of, this.resolvedOptions);
  }

  /**
   * @description The maximum fraction digits.
   * @public
   * @readonly
   * @type {(number | undefined)}
   */
  public get maximumFractionDigits(): number | undefined {
    return this.#maximumFractionDigits;
  }

  /**
   * @description The minimum fraction digits.
   * @public
   * @readonly
   * @type {(number | undefined)}
   */
  public get minimumFractionDigits(): number | undefined {
    return this.#minimumFractionDigits;
  }

  /**
   * @description The value.
   * @public
   * @readonly
   * @type {Value}
   */
  public get of(): Value {
    return this.valueOf() as Value;
  }

  /**
   * @description The value with currency.
   * @public
   * @readonly
   * @type {ValueWithCurrency<Value, Currency>}
   * @returns
   */
  public get withCurrency(): ValueWithCurrency<Value, Currency> {
    return this.#formatAsCurrency(this.#currency);
  }

  /**
   * @description
   * @type {Currency}
   */
  #currency: Currency;

  /**
   * @description
   * @type {?string}
   */
  #locales?: string;

  /**
   * @description
   * @type {number}
   */
  #maximumFractionDigits: number = CurrencyValue.maximumFractionDigits;

  /**
   * @description
   * @type {number}
   */
  #minimumFractionDigits: number = CurrencyValue.minimumFractionDigits;

  /**
   * @description
   * @public
   * @static
   * @param {string} value 
   * @returns {string} 
   */
  public static extractCurrencySymbol(value: string): string {
    return value.replace(/[\d\., ]/g, '');
  }

  /**
   * @description
   * @public
   * @static
   * @param {(number | bigint)} value 
   * @param {?CurrencyValueOptions} [options] 
   * @returns {string} 
   */
  public static format(
    value: number | bigint,
    options?: CurrencyValueOptions
  ): string {
    return new Intl.NumberFormat(options?.locales || this.locales, {
      maximumFractionDigits:
        options?.maximumFractionDigits || this.maximumFractionDigits,
      minimumFractionDigits:
        options?.minimumFractionDigits || this.minimumFractionDigits,
    }).format(this.replaceNaN(value));
  }

  /**
   * @description
   * @param {string} stringNumber 
   * @param {string} [locale=this.locales] 
   * @returns {number} 
   */
  public static formatToNumber = (
    stringNumber: string,
    locale: string = this.locales
  ): number => {
    const thousandSeparator = Intl.NumberFormat(locale)
      .format(11111)
      .replace(/\p{Number}/gu, '');
    const decimalSeparator = Intl.NumberFormat(locale)
      .format(1.1)
      .replace(/\p{Number}/gu, '');
    return parseFloat(
      stringNumber
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
    );
  };

  /**
   * @description
   * @public
   * @static
   * @template {number} Value 
   * @template {string} Currency 
   * @param {Value} value 
   * @param {Currency} currency 
   * @param {?CurrencyValueOptions} [options] 
   * @returns {ValueWithCurrency<Value, Currency>} 
   */
  public static formatAsCurrency<Value extends number, Currency extends string>(
    value: Value,
    currency: Currency,
    options?: CurrencyValueOptions
  ): ValueWithCurrency<Value, Currency> {
    return typeof currency === 'string' && currency.length === 3
      ? (new Intl.NumberFormat(options?.locales || this.locales, {
          currency,
          currencyDisplay: 'symbol',
          maximumFractionDigits:
            options?.maximumFractionDigits || this.maximumFractionDigits,
          minimumFractionDigits:
            options?.minimumFractionDigits || this.minimumFractionDigits,
          style: 'currency',
        }).format(this.replaceNaN(value)) as ValueWithCurrency<Value, Currency>)
      : `${currency} ${value}`;
  }

  /**
   * @description
   * @private
   * @static
   * @param {*} value 
   * @returns {number} 
   */
  private static replaceNaN(value: any): number {
    return isNaN(value) ? 0 : value;
  }

  /**
   * Creates an instance of `CurrencyValue`.
   * @constructor
   * @param {Value} value 
   * @param {Currency} currency 
   * @param {?CurrencyValueOptions} [options] 
   */
  constructor(
    value: Value,
    currency: Currency,
    options?: CurrencyValueOptions
  ) {
    super(value);
    // Set currency.
    this.#currency = currency;
    // Set options.
    typeof options === 'object' &&
      ((this.#locales = options?.locales),
      typeof options.maximumFractionDigits === 'number' &&
        (this.#maximumFractionDigits = options.maximumFractionDigits),
      typeof options.minimumFractionDigits === 'number' &&
        (this.#minimumFractionDigits = options.minimumFractionDigits));
  }

  /**
   * @description
   * @public
   * @template {Currencies} PickCurrency 
   * @param {PickCurrency} currency 
   * @param {?CurrencyValueOptions} [options] 
   * @returns {ValueWithCurrency<Value, PickCurrency>} 
   */
  public getValueAsCurrency<PickCurrency extends Currencies>(
    currency: PickCurrency,
    options?: CurrencyValueOptions
  ): ValueWithCurrency<Value, PickCurrency> {
    return this.#formatAsCurrency(currency, options);
  }

  /**
   * @description
   * @template {Currency | Currencies} PickCurrency 
   * @param {PickCurrency} currency 
   * @param {?CurrencyValueOptions} [options] 
   * @returns {ValueWithCurrency<Value, PickCurrency>} 
   */
  #formatAsCurrency<PickCurrency extends Currency | Currencies>(
    currency: PickCurrency,
    options?: CurrencyValueOptions
  ): ValueWithCurrency<Value, PickCurrency> {
    return CurrencyValue.formatAsCurrency(this.of, currency, {
      ...this.resolvedOptions,
      ...options,
    });
  }
}
