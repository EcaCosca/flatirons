import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CurrencyModule } from './currency/currency.module';
import { FileProcessingModule } from './file-processing/file-processing.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ProductsModule, CurrencyModule, FileProcessingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
