import {
  Conversion,
  Currencies,
  CurrencyValue,
  Exchange,
} from "../lib";

console.group(`CurrencyValue`);

const value = new CurrencyValue(42345255.356, 'USD');

console.log(`value: `, value); // 
console.log(`value.valueOf(): `, value.valueOf()); // 42345255.356
console.log(`value.currency: `, value.currency); // USD
console.log(`value.currencySymbol: `, value.currencySymbol); // $
console.log(`value.formatted: `, value.formatted); // 42,345,255.36

console.log(`value.of: `, value.of); // 42345255.356
console.log(`value.getValueOfCurrency('USD'):`, value.getValueAsCurrency('USD')); // $42,345,255.36
console.log('value.isBetweenEvery([43345255, 52345255.356], [3500, 127000]).', value.isBetweenEvery([43345255, 52345255.356], [3500, 127000])); // false
console.log(`value.lessThan(52345255.356):`, value.lessThan(52345255.356)); // true

console.groupEnd();
