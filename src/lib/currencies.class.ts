// Type.
import { AllCurrencies } from '@typedly/currency';
/**
 * @description
 * @export
 * @class Currencies
 * @template {string} Names 
 */
export class Currencies<Names extends string> {
  /**
   * @description
   * @public
   * @readonly
   * @type {Set<AllCurrencies<Names>>}
   */
  public get currencies(): Set<AllCurrencies<Names>> {
    return this.#currencies;
  }

  /**
   * @description
   * @type {Set<AllCurrencies<Names>>}
   */
  #currencies: Set<AllCurrencies<Names>> = new Set();

  /**
   * Creates an instance of `Currencies`.
   * @constructor
   * @param {...AllCurrencies<Names>[]} currencies 
   */
  constructor(...currencies: AllCurrencies<Names>[]) {
    this.add(...currencies);
  }

  /**
   * @description
   * @public
   * @param {...AllCurrencies<Names>[]} currencies 
   * @returns {this} 
   */
  public add(...currencies: AllCurrencies<Names>[]): this {
    currencies.forEach((currency) => this.#currencies.add(currency as Names));
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public clear(): this {
    this.#currencies.clear();
    return this;
  }

  /**
   * @description
   * @public
   * @param {...AllCurrencies<Names>[]} currencies 
   * @returns {this} 
   */
  public delete(...currencies: AllCurrencies<Names>[]): this {
    currencies.forEach((currency) =>
      this.#currencies.delete(currency as Names)
    );
    return this;
  }

  /**
   * @description
   * @public
   * @returns {AllCurrencies<Names>[]} 
   */
  public getCurrencies(): AllCurrencies<Names>[] {
    return Array.from(this.#currencies.values()) as AllCurrencies<Names>[];
  }

  /**
   * @description
   * @public
   * @param {...AllCurrencies<Names>[]} currencies 
   * @returns {boolean} 
   */
  public has(...currencies: AllCurrencies<Names>[]): boolean {
    return currencies.every((currency) =>
      this.#currencies.has(currency as Names)
    );
  }
}
