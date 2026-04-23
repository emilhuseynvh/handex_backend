import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Column } from "typeorm";

export class GetStudyAreaDto {
    @Column()
    @IsString()
    @ApiProperty({ default: 'back-end' })
    slug: string

    @Column()
    @IsString()
    @ApiProperty({ default: 'home' })
    model: string
}
