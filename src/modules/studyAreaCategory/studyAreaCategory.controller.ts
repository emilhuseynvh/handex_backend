import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { Auth } from "src/shares/decorators/auth.decorator";
import { StudyAreaCategoryService } from "./studyAreaCategory.service";
import { CreateStudyAreaCategoryDto } from "./dto/create-studyAreaCategory.dto";
import { UpdateStudyAreaCategoryDto } from "./dto/update-studyAreaCategory.dto";
import { UpdateStudyAreaCategoryOrderDto } from "./dto/update-studyAreaCategory-order.dto";

@Controller('study-area-category')
export class StudyAreaCategoryController {
    constructor(
        private categoryService: StudyAreaCategoryService
    ) { }

    @Get()
    @ApiQuery({ name: 'model', required: false, enum: ['home', 'corporate'] })
    async list(@Query('model') model?: string) {
        return await this.categoryService.list(model);
    }

    @Auth()
    @Post()
    async create(@Body() body: CreateStudyAreaCategoryDto) {
        return await this.categoryService.create(body);
    }

    @Auth()
    @Post('update/orders')
    async updateOrder(@Body() body: UpdateStudyAreaCategoryOrderDto) {
        return await this.categoryService.updateOrder(body);
    }

    @Auth()
    @Post(':id')
    async update(@Param('id') id: number, @Body() body: UpdateStudyAreaCategoryDto) {
        return await this.categoryService.update(id, body);
    }

    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.categoryService.delete(id);
    }
}
