import { PartialType } from "@nestjs/swagger";
import { CreateStudyAreaCategoryDto } from "./create-studyAreaCategory.dto";

export class UpdateStudyAreaCategoryDto extends PartialType(CreateStudyAreaCategoryDto) { }
