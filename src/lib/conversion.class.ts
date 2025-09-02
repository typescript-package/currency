// Class.
import { ConversionBase } from './conversion-base.abstract';
/**
 * @description The concrete class implementation for currency conversion.
 * @export
 * @class Conversion
 * @template {number} Amount The type of amount to convert.
 * @template {string} Currency The type of currency to convert from.
 * @template {string} [Currencies=string] The type of currencies to convert to.
 */
export class Conversion<
  Amount extends number,
  Currency extends string = string,
  Currencies extends string = string
> extends ConversionBase<Amount, Currency, Currencies> {}
