import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { DatabaseModule } from '../database/database.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
