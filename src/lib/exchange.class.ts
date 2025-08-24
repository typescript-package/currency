// Class.
import { Conversion } from './conversion.abstract';
// Type.
import { AllCurrencies } from '@typedly/currency';
/**
 * @description
 * @export
 * @class Exchange
 * @template {number} Amount 
 * @template {string} FromCurrency 
 * @extends {Conversion<Amount, FromCurrency, AllCurrencies<FromCurrency>>}
 */
export class Exchange<
  Amount extends number,
  FromCurrency extends string
> extends Conversion<
  Amount,
  FromCurrency,
  AllCurrencies<FromCurrency>
> {
  /**
   * Creates an instance of `Exchange`.
   * @constructor
   * @param {Amount} amount 
   * @param {FromCurrency} fromCurrency 
   * @param {?{
   *       [Key in AllCurrencies<FromCurrency>]?: number;
   *     }} [exchangeRate] 
   */
  constructor(
    amount: Amount,
    fromCurrency: FromCurrency,
    exchangeRate?: {
      [Key in AllCurrencies<FromCurrency>]?: number;
    }
  ) {
    super(amount, fromCurrency, exchangeRate);
  }
}
