import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CurrencyService } from '../currency/currency.service';
import { parseCsv } from './utils/csv-parser.util';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FileProcessingService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly currencyService: CurrencyService,
  ) {}

  async processFile(fileBuffer: Buffer): Promise<CreateProductDto[]> {
    if (!fileBuffer) {
        throw new Error('File buffer is undefined or invalid');
    }
    
    const targetCurrencies: string[] = ['eur', 'cad', 'ars', 'cny', 'jpy'];
    const exchangeRates: Record<string, number> = await this.currencyService.getExchangeRates(targetCurrencies);
    
    const rows: CsvRow[] = await parseCsv(fileBuffer);
    
    if (rows.length > 100000) {
      throw new BadRequestException('CSV file has too many rows. Maximum allowed is 100000.');
    }

    const validData: CreateProductDto[] = rows
        .map(row => this.transformRow(row, exchangeRates))
        .filter(item => item !== null);

    if (!validData.length) {
        throw new BadRequestException('No valid data to process');
    }

    await this.productsService.createMany(validData);
    const transformedRows = plainToInstance(CreateProductDto, rows);
    return transformedRows;
}

  private transformRow(row: CsvRow, exchangeRates: Record<string, number>): CreateProductDto | null {
    const priceInUsd: number = row.price

    const name: string = row.name?.trim();
    if (!name) return null;
    
    if (isNaN(priceInUsd)) return null;

    const expiration: Date = new Date(row.expiration);
    if (isNaN(expiration.getTime())) return null;

    const currencies: Record<string, number> = {
      eur: parseFloat((priceInUsd * exchangeRates['eur']).toFixed(2)),
      cad: parseFloat((priceInUsd * exchangeRates['cad']).toFixed(2)),
      ars: parseFloat((priceInUsd * exchangeRates['ars']).toFixed(2)),
      cny: parseFloat((priceInUsd * exchangeRates['cny']).toFixed(2)),
      jpy: parseFloat((priceInUsd * exchangeRates['jpy']).toFixed(2)),
    };

    return {
      name: row.name,
      price: priceInUsd,
      currencies: currencies,
      expiration,
    };
  }
}
