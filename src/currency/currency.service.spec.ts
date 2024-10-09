import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let mockAxios: MockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return exchange rates for valid target currencies', async () => {
    const mockData = {
      usd: {
        eur: 0.85,
        gbp: 0.75,
      },
    };
    mockAxios.onGet(service['API_BASE_URL']).reply(200, mockData);

    const rates = await service.getExchangeRates(['eur', 'gbp']);
    expect(rates).toEqual({ eur: 0.85, gbp: 0.75 });
  });

  it('should log a warning for invalid target currencies', async () => {
    const mockData = {
      usd: {
        eur: 0.85,
      },
    };
    mockAxios.onGet(service['API_BASE_URL']).reply(200, mockData);

    const loggerSpy = jest.spyOn(Logger.prototype, 'warn');
    await service.getExchangeRates(['eur', 'gbp']);
    expect(loggerSpy).toHaveBeenCalledWith('Rate for gbp not found');
  });

  it('should throw an InternalServerErrorException if no valid exchange rates are retrieved', async () => {
    const mockData = {
      usd: {},
    };
    mockAxios.onGet(service['API_BASE_URL']).reply(200, mockData);

    await expect(service.getExchangeRates(['eur', 'gbp'])).rejects.toThrow(InternalServerErrorException);
  });

  it('should throw an InternalServerErrorException if the API request fails', async () => {
    mockAxios.onGet(service['API_BASE_URL']).networkError();

    await expect(service.getExchangeRates(['eur', 'gbp'])).rejects.toThrow(InternalServerErrorException);
  });
});
