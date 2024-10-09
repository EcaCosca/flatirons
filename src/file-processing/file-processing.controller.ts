import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileProcessingService } from './file-processing.service';

@Controller('file-processing')
export class FileProcessingController {
  constructor(private readonly fileProcessingService: FileProcessingService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileBuffer = file.buffer;
    if (!fileBuffer) {
      throw new BadRequestException('File buffer not available');
    }

    const processedData = await this.fileProcessingService.processFile(fileBuffer);

    return { message: 'File uploaded and processed successfully', data: processedData };
  }
}