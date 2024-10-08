import { Module } from '@nestjs/common';
import { FileProcessingService } from './file-processing.service';
import { FileProcessingController } from './file-processing.controller';

@Module({
  providers: [FileProcessingService],
  controllers: [FileProcessingController]
})
export class FileProcessingModule {}
