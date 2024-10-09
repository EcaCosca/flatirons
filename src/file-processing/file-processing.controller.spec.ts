import { Test, TestingModule } from '@nestjs/testing';
import { FileProcessingController } from './file-processing.controller';
import { FileProcessingService } from './file-processing.service';
import { BadRequestException } from '@nestjs/common';

describe('FileProcessingController', () => {
  let controller: FileProcessingController;
  let fileProcessingService: FileProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileProcessingController],
      providers: [
        {
          provide: FileProcessingService,
          useValue: {
            processFile: jest.fn().mockResolvedValue('processedData'),
          },
        },
      ],
    }).compile();

    controller = module.get<FileProcessingController>(FileProcessingController);
    fileProcessingService = module.get<FileProcessingService>(FileProcessingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw BadRequestException if no file is uploaded', async () => {
    await expect(controller.uploadFile(null)).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if file buffer is not available', async () => {
    const file = { buffer: null } as any;
    await expect(controller.uploadFile(file)).rejects.toThrow(BadRequestException);
  });

  it('should call fileProcessingService.processFile with file buffer', async () => {
    const file = { buffer: Buffer.from('test') } as any;
    await controller.uploadFile(file);
    expect(fileProcessingService.processFile).toHaveBeenCalledWith(file.buffer);
  });

  it('should return processed data', async () => {
    const file = { buffer: Buffer.from('test') } as any;
    const result = await controller.uploadFile(file);
    expect(result).toEqual({ message: 'File uploaded and processed successfully', data: 'processedData' });
  });
});
