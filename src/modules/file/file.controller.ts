import {
  Controller,
  Get,
  Param,
  Res,
  HttpException,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('file')
export class FileController {
  constructor(protected fileService: FileService) {}

  @Get('/:path/:name')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment')
  async getFile(
    @Param('path') dir: string,
    @Param('name') fileName: string,
    @Res() res: Response,
  ) {
    const file = path.join(__dirname, '/../../uploads/imgs/', dir, fileName);

    try {
      if (fs.existsSync(file)) {
        res.set({ 'Content-Type': 'image/png' });
        res.sendFile(file);
      } else {
        throw new HttpException('Imagen no encontrada', HttpStatus.NOT_FOUND);
      }
    } catch (ex) {
      throw new HttpException('Imagen no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}
