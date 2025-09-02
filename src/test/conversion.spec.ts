import { Conversion, Exchange } from "../lib";
import { CONVERSION_RATES } from "./conversion.rates";

console.group(`Conversion`);

const conversion = new Conversion(15 as number, 'PLN', { 'USD': 0.275, 'EUR': 0.2347 });

console.debug(`conversion.amount`, conversion.amount); // 15
console.debug(`conversion.currency`, conversion.currency); // PLN
console.debug(`conversion.currencies`, conversion.currencies); // ['USD', 'EUR']

console.debug(`conversion.getConversionRates()`, conversion.getConversionRates()); // { 'USD': 0.275, 'EUR': 0.2347 }
console.debug(`conversion.conversionRates`, conversion.conversionRates); // Map([["USD", 0.275], ["EUR", 0.2347 ]]);

console.debug(`conversion.to('USD')`, conversion.to('USD')); // 4.125
console.debug(`conversion.to('EUR', 15)`, conversion.to('EUR', 15)); // 3.5204999999999997

console.debug(`conversion.toMany(['USD', 'EUR'])`, conversion.toMany(['USD', 'EUR'])); // { USD: 4.125, EUR: 3.5204999999999997 }
console.debug(`conversion.toMany(['USD', 'EUR'], 10)`, conversion.toMany(['USD', 'EUR'], 10)); // { USD: 2.75, EUR: 2.347 }
console.debug(`conversion.sumTo(['USD', 'EUR'], 10)`, conversion.sumTo(['USD', 'EUR'], 10)); // 5.0969999999999995

console.debug(`conversion.from('USD')`, conversion.from('USD')); // 54.54545454545454
console.debug(`conversion.from('EUR', 15)`, conversion.from('EUR', 15)); // 63.911376224968045
console.debug(`conversion.sumFrom(['USD', 'EUR'], 10)`, conversion.sumFrom(['USD', 'EUR'], 10)); // 78.97122051361507

console.debug(`conversion.fromMany(['USD', 'EUR'])`, conversion.fromMany(['USD', 'EUR'])); // { USD: 54.54545454545454, EUR: 63.911376224968045 }
console.debug(`conversion.fromMany(['USD', 'EUR'], 10)`, conversion.fromMany(['USD', 'EUR'], 10)); // { "USD": 36.36363636363636, "EUR": 42.6075841499787 }

console.debug(`conversion.setAmount(5)`, conversion.setAmount(5)); // 
console.debug(`conversion.to('EUR')`, conversion.to('EUR')); // 1.1735

console.groupEnd();

describe(`Conversion`, () => {
  let conversion = new Conversion(15 as number, 'PLN');
  beforeEach(() => conversion = new Conversion(15 as number, 'PLN', CONVERSION_RATES))

  it(`amount toEqual 15`, () => {
    expect(conversion.amount).toEqual(15);
  });
  it(`rates should be defined`, () => {
    expect(conversion.getConversionRates()).toEqual(CONVERSION_RATES);
  });
  it(`currencies should be defined`, () => {
    expect(conversion.currencies).toEqual(Object.keys(CONVERSION_RATES));
  });
  it(`should be defined`, () => {
    expect(conversion.currency).toEqual('PLN');
  });
  it(`should properly calculate in to`, () => {
    expect(conversion.to('USD')).toEqual(4.125);
  });
  it(`should properly calculate in toMany`, () => {
    expect(conversion.toMany(['USD', 'EUR', 'GBP'])).toEqual({
      'USD': 4.125,
      'EUR': 3.5204999999999997,
      'GBP': 3.0465
    });
  });
  it(`should properly calculate in from`, () => {
    expect(conversion.from('USD')).toEqual(54.54545454545454);
  });
  it(`should properly calculate in fromMany`, () => {
    expect(conversion.fromMany(['USD', 'EUR', 'GBP'])).toEqual({
      'USD': 54.54545454545454,
      'EUR': 63.911376224968045,
      'GBP': 73.85524372230428
    });
  });
  it(`set conversion rates properly`, () => {
    expect(new Conversion(15 as number, 'PLN', {'USD': 111, 'GBP': 222}).getConversionRates()).toEqual({'USD': 111, 'GBP': 222});
  });
});
