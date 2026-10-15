import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateMetaDto } from "src/modules/meta/meta-dto/create-meta.dto";
import { Lang } from "src/shares/enums/lang.enum";

export const BLOG_CTA_FIELDS = ['cta_title', 'cta_description', 'cta_button_text', 'cta_link'] as const;

class CreateBlogsTranslationsDto {
    @Type(() => String)
    @IsString()
    @ApiProperty({ default: 'title' })
    title: string;

    @Type(() => String)
    @IsString()
    @ApiProperty({ default: 'description' })
    description: string;

    @Type(() => String)
    @IsEnum(Lang)
    @ApiProperty({ default: Lang.AZ })
    lang: Lang;

    // Optional call-to-action block shown under the blog content. An empty string removes the field.
    @Type(() => String)
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 'Data analitikanı öyrənmək istəyirsiniz?' })
    cta_title?: string;

    @Type(() => String)
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 'Ətraflı məlumat üçün təlim səhifəmizə keçin.' })
    cta_description?: string;

    @Type(() => String)
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 'Ətraflı öyrən' })
    cta_button_text?: string;

    @Type(() => String)
    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: 'https://handex.edu.az/tedris/data-analitika' })
    cta_link?: string;
}
export class CreateBlogsDto {
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ default: 1 })
    image: number;

    @Type()
    @IsString()
    @ApiProperty({ default: 'slug' })
    slug: string;

    @Type(() => CreateBlogsTranslationsDto)
    @IsArray()
    @ApiProperty({ type: [CreateBlogsTranslationsDto] })
    translations: CreateBlogsTranslationsDto[];

    @Type(() => CreateMetaDto)
    @IsArray()
    @ValidateNested({ each: true })
    @ApiProperty({ type: [CreateMetaDto] })
    meta: CreateMetaDto[];
}