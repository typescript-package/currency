// Class.
import { ConversionBase } from './conversion-base.abstract';
/**
 * @description
 * @export
 * @class Conversion
 * @template {number} Amount 
 * @template {string} Currency 
 * @template {string} [Currencies=string] 
 */
export class Conversion<
  Amount extends number,
  Currency extends string = string,
  Currencies extends string = string
> extends ConversionBase<Amount, Currency, Currencies> {}
