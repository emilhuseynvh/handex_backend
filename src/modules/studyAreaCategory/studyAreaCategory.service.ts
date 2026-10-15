import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudyAreaCategoryEntity } from "src/entities/studyAreaCategory.entity";
import { StudyAreaEntity } from "src/entities/studyArea.entity";
import { In, Repository } from "typeorm";
import { CreateStudyAreaCategoryDto } from "./dto/create-studyAreaCategory.dto";
import { UpdateStudyAreaCategoryDto } from "./dto/update-studyAreaCategory.dto";
import { UpdateStudyAreaCategoryOrderDto } from "./dto/update-studyAreaCategory-order.dto";

@Injectable()
export class StudyAreaCategoryService {
    constructor(
        @InjectRepository(StudyAreaCategoryEntity)
        private categoryRepo: Repository<StudyAreaCategoryEntity>,

        @InjectRepository(StudyAreaEntity)
        private studyAreaRepo: Repository<StudyAreaEntity>,
    ) { }

    async list(model?: string) {
        return await this.categoryRepo.find({
            where: model ? { model } : {},
            select: {
                id: true,
                name: true,
                model: true,
                order: true,
                studyAreas: {
                    id: true,
                    name: true,
                    slug: true,
                    order: true
                }
            },
            relations: ['studyAreas'],
            order: { order: 'ASC', id: 'ASC', studyAreas: { order: 'ASC', id: 'ASC' } }
        });
    }

    async create(params: CreateStudyAreaCategoryDto) {
        const last = await this.categoryRepo.findOne({ where: { model: params.model }, order: { order: 'DESC' } });

        const category = await this.categoryRepo.save(this.categoryRepo.create({
            name: params.name.trim(),
            model: params.model,
            order: (last?.order ?? 0) + 1
        }));

        if (params.studyAreas) await this.assignStudyAreas(category, params.studyAreas);

        return category;
    }

    async update(id: number, params: UpdateStudyAreaCategoryDto) {
        const category = await this.categoryRepo.findOneBy({ id });
        if (!category) throw new NotFoundException('Category is not found');

        if (params.name) category.name = params.name.trim();
        if (params.model) category.model = params.model;
        await this.categoryRepo.save(category);

        if (params.studyAreas) await this.assignStudyAreas(category, params.studyAreas);

        return category;
    }

    async delete(id: number) {
        const result = await this.categoryRepo.delete(id);
        if (!result.affected) throw new NotFoundException('Category is not found');

        return { message: 'Category deleted successfully' };
    }

    async updateOrder(params: UpdateStudyAreaCategoryOrderDto) {
        for (const item of params.items) {
            const result = await this.categoryRepo.update(item.id, { order: item.order });
            if (!result.affected) throw new NotFoundException(`Category is not found in ${item.id} id`);
        }

        return { message: 'Orders updated successfully' };
    }

    // A study area belongs to at most one category, so selecting it here moves it out of any other category.
    private async assignStudyAreas(category: StudyAreaCategoryEntity, ids: number[]) {
        await this.studyAreaRepo.update({ categoryId: category.id }, { categoryId: null });

        if (ids.length) {
            await this.studyAreaRepo.update({ id: In(ids), model: category.model }, { categoryId: category.id });
        }
    }
}
