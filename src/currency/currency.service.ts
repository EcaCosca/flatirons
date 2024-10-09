import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CurrencyService {
  private readonly API_BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';
  private readonly logger = new Logger(CurrencyService.name);

  async getExchangeRates(targetCurrencies: string[]): Promise<any> {
    try {
      const { data } = await axios.get(this.API_BASE_URL);
      const rates = targetCurrencies.reduce((acc, currency) => {
        if (data.usd[currency]) acc[currency] = data.usd[currency];
        else this.logger.warn(`Rate for ${currency} not found`);
        return acc;
      }, {});

      if (Object.keys(rates).length === 0) {
        throw new InternalServerErrorException('No valid exchange rates retrieved');
      }

      return rates;
    } catch (error) {
      this.logger.error('Failed to fetch exchange rates', error);
      throw new InternalServerErrorException('Failed to fetch exchange rates');
    }
  }
}
