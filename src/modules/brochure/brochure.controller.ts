import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Body, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BrochureService } from './brochure.service';
import { Express } from 'express';
import {
  ApiConsumes,
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Auth } from 'src/shares/decorators/auth.decorator';

@ApiTags('Brochure')
@Controller('brochure')
export class BrochureController {
  constructor(private brochureService: BrochureService) { }

  @Auth()
  @Post('upload')
  @ApiOperation({ summary: 'Broşur və Study Area ID yüklə' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        studyAreaId: {
          type: 'number',
          example: 1,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/brochures',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('studyAreaId') studyAreaId: number,
  ) {
    const saved = await this.brochureService.saveBrochure(file, studyAreaId);
    return saved;
  }

  @Get(':studyAreaId')
  @ApiOperation({ summary: 'Study Area üçün broşur gətir' })
  @ApiParam({ name: 'studyAreaId', type: Number })
  async list(@Param('studyAreaId') studyAreaId: number) {
    return this.brochureService.list(studyAreaId);
  }

  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.brochureService.delete(id);
  }
}
