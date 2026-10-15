import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from "class-validator";

export class StudyAreaCategoryOrderItemDto {
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ default: 1 })
    id: number;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ default: 1 })
    order: number;
}

export class UpdateStudyAreaCategoryOrderDto {
    @Type(() => StudyAreaCategoryOrderItemDto)
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @ApiProperty({ type: [StudyAreaCategoryOrderItemDto] })
    items: StudyAreaCategoryOrderItemDto[];
}
