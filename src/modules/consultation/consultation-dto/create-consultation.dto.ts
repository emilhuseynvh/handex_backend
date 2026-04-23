import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional,  IsString, Matches, MinLength } from "class-validator";

export class CreateConsultationDto {
    @Type()
    @IsString({ message: 'consultation.name.isString' })
    @MinLength(1, { message: 'consultation.name.isString' })
    @ApiProperty({ default: 'John' })
    name: string;

    @Type()
    @IsString({ message: 'consultation.surname.isString' })
    @MinLength(1, { message: 'consultation.surname.isString' })
    @ApiProperty({ default: 'Doe' })
    surname: string;

    @Type()
    @Matches(/^\+994\d{9}$/, { message: 'consultation.phone.matches' })
    @IsOptional()
    @ApiProperty({ default: '+994505005050' })
    phone: string;

    @Type()
    @IsString()
    @IsOptional()
    email: string;

    @Type()
    @IsString()
    @IsOptional()
    company: string    

    @Type()
    @IsNumber({}, { message: 'consultation.course.isNumber' })
    @ApiProperty({ default: 1 })
    course: number;
}
