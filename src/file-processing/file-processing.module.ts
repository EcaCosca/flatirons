import { Module } from '@nestjs/common';
import { FileProcessingService } from './file-processing.service';
import { FileProcessingController } from './file-processing.controller';
import { ProductsModule } from '../products/products.module';
import { CurrencyModule } from '../currency/currency.module';

@Module({
  imports: [ProductsModule, CurrencyModule],
  controllers: [FileProcessingController],
  providers: [FileProcessingService],
})
export class FileProcessingModule {}
