// Range.
import { Number } from '@typescript-package/range';
// Type.
import { ValueWithCurrency } from '@typedly/currency';
// Interface.
import { CurrencyValueOptions } from '@typedly/currency';
/**
 *
 */
export class CurrencyValue<
  Value extends number = number,
  Currency extends string = string,
  Currencies extends string = string
> extends Number<Value> {
  /**
   *
   */
  public static locales = navigator.language;

  /**
   *
   */
  public static maximumFractionDigits = 2;

  /**
   *
   */
  public static minimumFractionDigits = 2;

  /**
   *
   */
  public get currency(): Currency {
    return this.#currency;
  }

  /**
   *
   */
  public get currencySymbol(): string {
    return CurrencyValue.extractCurrencySymbol(this.withCurrency);
  }

  /**
   *
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
   *
   */
  public get locales(): string | undefined {
    return this.#locales;
  }

  /**
   *
   */
  public get resolvedOptions(): CurrencyValueOptions {
    return {
      locales: this.#locales,
      maximumFractionDigits: this.#maximumFractionDigits,
      minimumFractionDigits: this.#minimumFractionDigits,
    };
  }

  /**
   *
   */
  public get formatted(): string {
    return CurrencyValue.format(this.of, this.resolvedOptions);
  }

  /**
   *
   */
  public get maximumFractionDigits(): number | undefined {
    return this.#maximumFractionDigits;
  }

  /**
   *
   */
  public get minimumFractionDigits(): number | undefined {
    return this.#minimumFractionDigits;
  }

  /**
   *
   */
  public get of(): Value {
    return this.valueOf() as Value;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public get withCurrency(): ValueWithCurrency<Value, Currency> {
    return this.#formatAsCurrency(this.#currency);
  }

  /**
   *
   */
  #currency: Currency;

  /**
   *
   */
  #locales?: string;

  /**
   *
   */
  #maximumFractionDigits = CurrencyValue.maximumFractionDigits;

  /**
   *
   */
  #minimumFractionDigits = CurrencyValue.minimumFractionDigits;

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public static extractCurrencySymbol(value: string): string {
    return value.replace(/[\d\., ]/g, '');
  }

  /**
   *
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
   *
   * @param stringNumber
   * @param locale
   * @returns
   * @angularpackage
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
   *
   * @param value
   * @param currency
   * @param maximumFractionDigits
   * @returns
   * @angularpackage
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
   *
   * @param value
   * @returns
   * @angularpackage
   */
  public static getCurrencySymbol(
    code: string,
    format: 'wide' | 'narrow' = 'narrow',
    locales = this.locales
  ): string {
    return void(0) as any;
    // return getCurrencySymbol(code, format, locales);
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
   */
  private static replaceNaN(value: any): number {
    return isNaN(value) ? 0 : value;
  }

  /**
   *
   * @param value
   * @param currency
   * @angularpackage
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
   *
   * @param currency
   * @returns
   * @angularpackage
   */
  public getValueAsCurrency<PickCurrency extends Currencies>(
    currency: PickCurrency,
    options?: CurrencyValueOptions
  ): ValueWithCurrency<Value, PickCurrency> {
    return this.#formatAsCurrency(currency, options);
  }

  /**
   *
   * @param value
   * @returns
   * @angularpackage
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
