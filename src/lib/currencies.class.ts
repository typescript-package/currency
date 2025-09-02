
/**
 * @description The class to store codes of the currencies.
 * @export
 * @class Currencies
 * @template {string} Codes 
 */
export class Currencies<Codes extends string> {
  /**
   * @description Returns the set of currency codes.
   * @public
   * @readonly
   * @type {Set<Codes>}
   */
  public get codes(): Set<Codes> {
    return this.#codes;
  }

  /**
   * @description Privately stored currency codes.
   * @type {Set<Codes>}
   */
  #codes: Set<Codes> = new Set();

  /**
   * Creates an instance of `Currencies`.
   * @constructor
   * @param {...Codes[]} codes 
   */
  constructor(...codes: Codes[]) {
    this.add(...codes);
  }

  /**
   * @description Adds the currency codes.
   * @public
   * @param {...Codes[]} codes Currency codes to add.
   * @returns {this} 
   */
  public add(...codes: Codes[]): this {
    codes.forEach(code => this.#codes.add(code as Codes));
    return this;
  }

  /**
   * @description Clears the currency codes.
   * @public
   * @returns {this} 
   */
  public clear(): this {
    this.#codes.clear();
    return this;
  }

  /**
   * @description Deletes the specified currency codes.
   * @public
   * @param {...Codes[]} codes 
   * @returns {this} 
   */
  public delete(...codes: Codes[]): this {
    codes.forEach(code => this.#codes.delete(code as Codes));
    return this;
  }

  /**
   * @description Returns an array of all currency codes.
   * @public
   * @returns {Codes[]} 
   */
  public getCurrencies(): Codes[] {
    return Array.from(this.#codes.values()) as Codes[];
  }

  /**
   * @description Checks if the specified currency codes are present.
   * @public
   * @param {...Codes[]} codes 
   * @returns {boolean} 
   */
  public has(...codes: Codes[]): boolean {
    return codes.every(code => this.#codes.has(code as Codes));
  }
}
