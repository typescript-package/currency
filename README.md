
<a href="https://www.typescriptlang.org/">
  <img
    src="https://avatars.githubusercontent.com/u/189666396?s=150&u=9d55b1eb4ce258974ead76bf07ccf49ef0eb0ea7&v=4"
    title="typescript-package/currency - A lightweight package for conversion/exchanges fiat or cryptocurrencies with formatted value."
  />
</a>

## typescript-package/currency

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A **lightweight** TypeScript package for conversion/exchanges fiat or cryptocurrencies with formatted value.

## Table of contents

- [Installation](#installation)
- [Api](#api)
  - **Abstract**
    - `ConversionBase`
    - `ConversionCore`
  - **Class**
    - `Conversion`
    - `Currencies`
    - `CurrencyValue`
    - `Exchange`
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](#code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)
- [Related packages](#related-packages)

## Installation

### 1, Install peer dependencies

```bash
npm install
  @typedly/currency
  @typescript-package/range --save-peer
```

### 2. Install the package

```bash
npm install @typescript-package/currency --save-peer
```

## Api

```typescript
import {
  // Abstract.
  ConversionBase,
  ConversionCore,
  // Class.
  Conversion,
  Currencies,
  CurrencyValue,
  Exchange
} from '@typescript-package/currency';
```

### `Conversion`

```typescript
import { Conversion } from '@typescript-package/currency';

const conversion = new Conversion(15 as number, 'PLN', { 'USD': 0.275, 'EUR': 0.2347 });

conversion.amount; // 15
conversion.currency; // PLN
conversion.currencies; // ['USD', 'EUR']

conversion.getConversionRates(); // { 'USD': 0.275, 'EUR': 0.2347 }
conversion.conversionRates; // Map([["USD", 0.275], ["EUR", 0.2347 ]]);

// Convert PLN to USD.
conversion.to('USD'); // 4.125
// Convert 15 PLN to EUR.
conversion.to('EUR', 15); // 3.5204999999999997

// Convert USD and EUR to PLN.
conversion.toMany(['USD', 'EUR']); // { USD: 4.125, EUR: 3.5204999999999997 }
// Convert 10 USD and 10 EUR to PLN.
conversion.toMany(['USD', 'EUR'], 10); // { USD: 2.75, EUR: 2.347 }
// Convert and sum USD and EUR.
conversion.sumTo(['USD', 'EUR'], 10); // 5.0969999999999995

// Convert USD to PLN.
conversion.from('USD'); // 54.54545454545454
// Convert custom 15 EUR to PLN.
conversion.from('EUR', 15); // 63.911376224968045

// Convert 10 USD and 10 EUR to PLN.
conversion.fromMany(['USD', 'EUR']); // { USD: 54.54545454545454, EUR: 63.911376224968045 }
conversion.fromMany(['USD', 'EUR'], 10); // { "USD": 36.36363636363636, "EUR": 42.6075841499787 }
conversion.sumFrom(['USD', 'EUR'], 10); // 78.97122051361507

// Set amount to 5 PLN.
conversion.setAmount(5);

// Convert 5 PLN to EUR.
conversion.to('EUR'); // 1.1735

```

### `Currencies`

```typescript
import { Currencies } from '@typescript-package/currency';
```

### `CurrencyValue`

```typescript
import { CurrencyValue } from '@typescript-package/currency';
```

### `Exchange`

```typescript
import { Exchange } from '@typescript-package/currency';

const exchange = new Exchange(
  15 as number, // number
  'PLN',        // base currency code
  ['USD', 'EUR'], // currencies for exchanges
  { 'USD': 0.275, 'EUR': 0.2347 } // custom exchanges
  // link for exchange api
);

exchange.amount; // 15
exchange.currency; // PLN
exchange.currencies; // ['USD', 'EUR']

exchange.exchangeRates; // { 'USD': 0.275, 'EUR': 0.2347 }

exchange.to('USD').then(result => console.debug(`exchange.to('USD')`, result)); // 4.125
exchange.to('EUR', 15).then(result => console.debug(`exchange.to('EUR', 15)`, result)); // 3.5204999999999997

exchange.from('USD').then(result => console.debug(`exchange.from('USD')`, result)); // 54.54545454545454
exchange.from('EUR', 15).then(result => console.debug(`exchange.from('EUR', 15)`, result)); // 63.911376224968045
```

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)
- [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
- [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
- [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)

or via Trust Wallet

- [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)
- [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
- [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
- [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

## Related packages

- **[@typescript-package/chain-descriptor](https://github.com/typescript-package/chain-descriptor)**: A **TypeScript** library for chain property descriptor.
- **[@typescript-package/controller](https://github.com/typescript-package/controller)**: A **TypeScript** package with for various kind of controllers.
- **[@typescript-package/descriptor](https://github.com/typescript-package/descriptor)**: A **TypeScript** library for property descriptor.
- **[@typescript-package/descriptor-chain](https://github.com/typescript-package/descriptor-chain)**: A **TypeScript** library for property descriptor chain.
- **[@typescript-package/descriptors](https://github.com/typescript-package/descriptors)**: A **TypeScript** library for property descriptors.
- **[@typescript-package/property](https://github.com/typescript-package/property)**: A **TypeScript** package with features to handle object properties.
- **[@typescript-package/wrap-descriptor](https://github.com/typescript-package/wrap-descriptor)**: A **TypeScript** package for wrapping object descriptors.
- **[@typescript-package/wrap-property](https://github.com/typescript-package/wrap-property)**: A **TypeScript** package for wrapping object properties.
- **[@xtypescript/property](https://github.com/xtypescript/property)** - A comprehensive, reactive **TypeScript** library for precise and extensible object property control.

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/currency
  [typescript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/currency
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/currency
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/currency
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/currency/issues
  [typescript-package-forks]: https://github.com/typescript-package/currency/network
  [typescript-package-license]: https://github.com/typescript-package/currency/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/currency/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fcurrency.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fcurrency


<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
