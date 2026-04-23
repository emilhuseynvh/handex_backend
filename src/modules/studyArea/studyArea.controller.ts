import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { StudyAreaService } from "./studyArea.service";
import { Auth } from "src/shares/decorators/auth.decorator";
import { CreateStudyAreaDto } from "./dto/create-studyArea.dto";
import { UpdateStudyAreaDto } from "./dto/update-studyArea.dto";
import { ApiQuery } from "@nestjs/swagger";
import { GetStudyAreaDto } from "./dto/get-studyArea.dto";

@Controller('study-area')
export class StudyAreaController {
    constructor(
        private studyAreaService: StudyAreaService
    ) { }

    @Get()
    async list(@Query('model') model: string) {
        return await this.studyAreaService.list(model);
    }

    @Get(':slug/:model')
    async listOne(@Param() params: GetStudyAreaDto) {
        return await this.studyAreaService.listOne(params.slug, params.model);
    }

    @Get(':slug/item/:model')
    async item(@Param() params: GetStudyAreaDto) {
        return await this.studyAreaService.item(params.slug, params.model);
    }

    @Get(':slug/programs/:model')
    async getPrograms(@Param() params: GetStudyAreaDto) {
        return await this.studyAreaService.getPrograms(params.slug, params.model);
    }

    @Get(':slug/faq/:model')
    async getFaqs(@Param() params: GetStudyAreaDto) {
        return await this.studyAreaService.getFaq(params.slug,params.model);
    }

    @Get(':slug/groups/:model')
    async getGroups(@Param() params: GetStudyAreaDto) {
        return await this.studyAreaService.getGroups(params.slug, params.model);
    }

    @Get(':slug/profile/:model')
    async getProfile(@Param() params: GetStudyAreaDto) {
        return await this.studyAreaService.getProfile(params.slug, params.model);
    }

    @Auth()
    @Post()
    async create(@Body() body: CreateStudyAreaDto) {
        return await this.studyAreaService.create(body);
    }

    @Auth()
    @Post(':id')
    async update(@Param('id') id: number, @Body() body: UpdateStudyAreaDto) {
        return await this.studyAreaService.update(id, body);
    }

    @Auth()
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.studyAreaService.delete(id);
    }
    
    @Auth()
    @Post('update/orders')
    async updateOrders(@Body() body: any) {
        return await this.studyAreaService.updateOrder(body);
    }

    @Auth()
    @Delete(':id/brochure')
    async deleteBrochure(@Param('id') id: number) {
        return await this.studyAreaService.deleteBrochure(id);
    }
}
