import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { DatabaseService } from '../database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilter } from './dto/filter-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: DatabaseService,
          useValue: {
            product: {
              create: jest.fn(),
              createMany: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = { name: 'Test Product', price: 100, currencies: {
      eur: 0.85,
      cad: 0.85,
      ars: 0.85,
      cny: 0.85,
      jpy: 0.85,
    }, expiration: new Date() };
    const id = 1;
    const createdProduct = { id, ...createProductDto, currencies: JSON.stringify(createProductDto.currencies) };
    jest.spyOn(databaseService.product, 'create').mockResolvedValue(createdProduct);

    const result = await service.create(createProductDto);
    expect(result).toEqual(createdProduct);
    expect(databaseService.product.create).toHaveBeenCalledWith({ data: { ...createProductDto, currencies: JSON.stringify(createProductDto.currencies) } });
  });

  it('should find all products with filters', async () => {
    const filters: ProductFilter = { name: 'Test', minPrice: '50', maxPrice: '150', sortField: 'price', sortOrder: 'desc' };
    const foundProducts = [{ id: 1, name: 'Test Product', price: 100, currencies: '["USD"]', expiration: new Date() }];
    jest.spyOn(databaseService.product, 'findMany').mockResolvedValue(foundProducts);

    const result = await service.findAll(filters);
    expect(result).toEqual(foundProducts);
    expect(databaseService.product.findMany).toHaveBeenCalled();
  });
});
