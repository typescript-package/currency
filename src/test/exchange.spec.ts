import { Exchange } from "../lib";
import { CONVERSION_RATES } from "./conversion.rates";

console.group(`Exchange`);

const exchange = new Exchange(15 as number, 'PLN', ['USD', 'EUR'], { 'USD': 0.275, 'EUR': 0.2347 });

console.debug(`exchange.amount`, exchange.amount); // 15
console.debug(`exchange.currency`, exchange.currency); // PLN
console.debug(`exchange.currencies`, exchange.currencies); // ['USD', 'EUR']

console.debug(`exchange.getConversionRates()`, exchange.exchangeRates); // { 'USD': 0.275, 'EUR': 0.2347 }

exchange.to('USD').then(result => console.debug(`exchange.to('USD')`, result)); // 4.125
exchange.to('EUR', 15).then(result => console.debug(`exchange.to('EUR', 15)`, result)); // 3.5204999999999997

exchange.from('USD').then(result => console.debug(`exchange.from('USD')`, result)); // 54.54545454545454
exchange.from('EUR', 15).then(result => console.debug(`exchange.from('EUR', 15)`, result)); // 63.911376224968045

console.groupEnd();
  
describe(`Exchange`, () => {
  let exchange = new Exchange(15 as number, 'PLN', ['USD', 'EUR']);
  beforeEach(() => exchange = new Exchange(15 as number, 'PLN', ['USD', 'EUR'], CONVERSION_RATES))

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
