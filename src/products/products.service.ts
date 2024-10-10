import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilter } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(data: CreateProductDto) {
    const transformedData = {
      ...data,
      currencies: JSON.stringify(data.currencies)
    };
    return this.databaseService.product.create({ data: transformedData });
  }

  async createMany(data: CreateProductDto[]) {
    const transformedData = data.map(item => ({
      ...item,
      currencies: JSON.stringify(item.currencies)
    }));
    return this.databaseService.product.createMany({ data: transformedData });
  }

  async findAll(filters: ProductFilter) {
    const {
      name,
      minPrice,
      maxPrice,
      minExpiration,
      maxExpiration,
      sortField = 'name',
      sortOrder = 'asc'
    } = filters;

    const where: {
      name?: { contains: string, mode: 'insensitive' },
      price?: { gte?: number, lte?: number },
      expiration?: { gte?: Date, lte?: Date }
    } = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (minExpiration || maxExpiration) {
      where.expiration = {};
      if (minExpiration) where.expiration.gte = new Date(minExpiration);
      if (maxExpiration) where.expiration.lte = new Date(maxExpiration);
    }

    const orderBy = { [sortField]: sortOrder };

    return this.databaseService.product.findMany({
      where,
      orderBy,
    });
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({ where: { id } });
  }

  async update(id: number, updateProductDto: Partial<CreateProductDto>) {
    const transformedUpdateProductDto = {
      ...updateProductDto,
      currencies: updateProductDto.currencies ? JSON.stringify(updateProductDto.currencies) : undefined
    };
    return this.databaseService.product.update({ where: { id }, data: transformedUpdateProductDto });
  }

  async remove(id: number) {
    return this.databaseService.product.delete({ where: { id } });
  }
}
