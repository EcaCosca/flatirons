import { IsOptional, IsNumber, IsObject, IsDate } from 'class-validator';

class CurrenciesDto {
  @IsOptional()
  @IsNumber()
  eur?: number;

  @IsOptional()
  @IsNumber()
  cad?: number;

  @IsOptional()
  @IsNumber()
  ars?: number;

  @IsOptional()
  @IsNumber()
  cny?: number;

  @IsOptional()
  @IsNumber()
  jpy?: number;
}

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsObject()
  currencies?: CurrenciesDto;

  @IsOptional()
  @IsDate()
  expiration?: Date;
}
