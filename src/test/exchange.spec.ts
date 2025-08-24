import {
  Conversion,
  Currencies,
  CurrencyValue,
  Exchange,
} from "../lib";

const EXCHANGE = new Exchange(3500, "PLN", {"USD": 3.88});

console.log(`amount: `, EXCHANGE.to("USD"));
// console.log(`amount: `, EXCHANGE.amount);
console.log(`fromCurrency: `, EXCHANGE.fromCurrency);
// console.log(`to("USD")`, EXCHANGE.setAmount(3500).to("USD")); // 
// console.log(``, EXCHANGE.toMany(
//   (exchanged) => { console.log(`exchanged: `, exchanged); },
//   (reason) => { console.log('reason: '); return reason; },
//   "EUR",
//   "USD",
// )); // Object{EUR: 'EUR 819.00', USD: 'USD 906.50'}

describe("Exchange()", () => {
  it("to('USD') toEqual $902.06", () => {
    expect(EXCHANGE.to("USD")).toEqual('$902.06');
  });
});
