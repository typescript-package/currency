import { Exchange } from "../lib";
import { CONVERSION_RATES } from "./conversion.rates";

describe(`Exchange`, () => {
  let exchange = new Exchange(15 as number, 'PLN');
  beforeEach(() => exchange = new Exchange(15 as number, 'PLN', CONVERSION_RATES))

  it(`should properly calculate in to method`, async () => {
    await expectAsync(exchange.to('USD')).toBeResolvedTo(4.125);
  });
  it(`should properly calculate in toMany method`, async () => {
    await expectAsync(exchange.toMany(['USD', 'EUR'])).toBeResolvedTo({
      'USD': 4.125,
      'EUR': 3.5204999999999997
    });
  });

  it(`should properly calculate in from method`, async () => {
    await expectAsync(exchange.from('USD')).toBeResolvedTo(54.54545454545454);
  });
  it(`should properly calculate in fromMany method`, async () => {
    await expectAsync(exchange.fromMany(['USD', 'EUR'])).toBeResolvedTo({
      'USD': 54.54545454545454,
      'EUR': 63.911376224968045
    });
  });
});
