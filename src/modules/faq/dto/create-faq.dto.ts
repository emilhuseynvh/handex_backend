import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsOptional,  IsNumber, IsString } from "class-validator";
import { Lang } from "src/shares/enums/lang.enum";

export class CreateFaqTranslationsDto {
    @Type()
    @IsString()
    @ApiProperty({ default: 'title' })
    title: string;

    @Type()
    @IsString()
    @ApiProperty({ default: 'Xeber1' })
    description: string;

    @Type()
    @IsEnum(Lang)
    @ApiProperty({ default: Lang.AZ })
    lang: Lang;
}

export class CreateFaqDto {
    @Type()
    @IsString()
    @IsOptional()
    @ApiProperty({ default: 'home' })
    model: string

    @Type()
    @IsNumber()
    @IsOptional()
    @ApiProperty({ default: 0 })
    areaStudy: number;

    @Type(() => CreateFaqTranslationsDto)
    @IsArray()
    @ApiProperty({ type: [CreateFaqTranslationsDto] })
    translations: CreateFaqTranslationsDto[];
}
