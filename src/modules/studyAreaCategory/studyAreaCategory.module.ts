import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudyAreaCategoryEntity } from "src/entities/studyAreaCategory.entity";
import { StudyAreaEntity } from "src/entities/studyArea.entity";
import { StudyAreaCategoryController } from "./studyAreaCategory.controller";
import { StudyAreaCategoryService } from "./studyAreaCategory.service";

@Module({
    imports: [TypeOrmModule.forFeature([StudyAreaCategoryEntity, StudyAreaEntity])],
    controllers: [StudyAreaCategoryController],
    providers: [StudyAreaCategoryService]
})
export class StudyAreaCategoryModule { }
