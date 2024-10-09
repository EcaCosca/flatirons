import { Test, TestingModule } from '@nestjs/testing';
import { FileProcessingService } from './file-processing.service';
import { ProductsService } from '../products/products.service';
import { CurrencyService } from '../currency/currency.service';
import { BadRequestException } from '@nestjs/common';

describe('FileProcessingService', () => {
  let service: FileProcessingService;
  let productsService: ProductsService;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileProcessingService,
        {
          provide: ProductsService,
          useValue: { createMany: jest.fn() },
        },
        {
          provide: CurrencyService,
          useValue: { getExchangeRates: jest.fn().mockResolvedValue({
            eur: 0.85,
            cad: 1.25,
            ars: 95.00,
            cny: 6.45,
            jpy: 110.00,
          }) },
        },
      ],
    }).compile();

    service = module.get<FileProcessingService>(FileProcessingService);
    productsService = module.get<ProductsService>(ProductsService);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an error if fileBuffer is undefined', async () => {
    await expect(service.processFile(undefined)).rejects.toThrow('File buffer is undefined or invalid');
  });
});
