
/**
 * @description
 * @export
 * @class Currencies
 * @template {string} Codes 
 */
export class Currencies<Codes extends string> {
  /**
   * @description
   * @public
   * @readonly
   * @type {Set<Codes>}
   */
  public get codes(): Set<Codes> {
    return this.#codes;
  }

  /**
   * @description
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
   * @description
   * @public
   * @param {...Codes>[]} codes 
   * @returns {this} 
   */
  public add(...codes: Codes[]): this {
    codes.forEach(code => this.#codes.add(code as Codes));
    return this;
  }

  /**
   * @description
   * @public
   * @returns {this} 
   */
  public clear(): this {
    this.#codes.clear();
    return this;
  }

  /**
   * @description
   * @public
   * @param {...Codes[]} codes 
   * @returns {this} 
   */
  public delete(...codes: Codes[]): this {
    codes.forEach(code => this.#codes.delete(code as Codes));
    return this;
  }

  /**
   * @description
   * @public
   * @returns {Codes[]} 
   */
  public getCurrencies(): Codes[] {
    return Array.from(this.#codes.values()) as Codes[];
  }

  /**
   * @description
   * @public
   * @param {...Codes[]} codes 
   * @returns {boolean} 
   */
  public has(...codes: Codes[]): boolean {
    return codes.every(code => this.#codes.has(code as Codes));
  }
}
