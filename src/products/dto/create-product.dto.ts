import { IsNotEmpty, IsNumber, IsDate } from 'class-validator';

class CurrenciesDto {
  @IsNumber()
  eur?: number;

  @IsNumber()
  cad?: number;

  @IsNumber()
  ars?: number;

  @IsNumber()
  cny?: number;

  @IsNumber()
  jpy?: number;
}

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  currencies: CurrenciesDto;

  @IsDate()
  @IsNotEmpty()
  expiration: Date;
}
