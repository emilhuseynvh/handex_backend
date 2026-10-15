import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateStudyAreaCategoryDto {
    @Type()
    @IsString()
    @MinLength(1)
    @ApiProperty({ default: 'Microsoft' })
    name: string;

    @Type()
    @IsIn(['home', 'corporate'])
    @ApiProperty({ default: 'corporate', enum: ['home', 'corporate'] })
    model: string;

    @Type(() => Number)
    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    @ApiProperty({ required: false, default: [1, 2] })
    studyAreas?: number[];
}
