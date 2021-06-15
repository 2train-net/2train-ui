import { DOLLARS_TEXT, COLONES_TEXT, DOLLAR_TEXT, COLON_TEXT } from 'shared/constants';
import { Currency } from 'shared/generated';

const singularCurrency = {
  [Currency.Us]: DOLLAR_TEXT,
  [Currency.Crc]: COLON_TEXT
};

const pluralCurrency = {
  [Currency.Us]: DOLLARS_TEXT,
  [Currency.Crc]: COLONES_TEXT
};

export class CurrencyService {
  parseCurrency = (currency: Currency) => {
    return singularCurrency[currency] || currency;
  };

  parseCurrencyByCount = (count: number, currency: Currency) => {
    return count === 1 ? singularCurrency[currency] : pluralCurrency[currency];
  };
}

const instance = new CurrencyService();

export default instance;
