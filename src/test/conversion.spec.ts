import { Conversion } from "../lib";
import { CONVERSION_RATES } from "./conversion.rates";

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
