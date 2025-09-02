import { AllCurrencies } from "@typedly/currency";
import {
  Conversion,
  Currencies,
  CurrencyValue,
  Exchange,
} from "../lib";

export class CustomCurrencies<Codes extends string> extends Currencies<AllCurrencies<Codes>> {}

const CURRENCIES = new CustomCurrencies('USD', 'INCH');

