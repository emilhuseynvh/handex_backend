import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from "class-validator";

export class ProfileOrderItemDto {
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ default: 1 })
    id: number;

    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ default: 1 })
    order: number;
}

export class UpdateProfileOrderDto {
    @Type(() => ProfileOrderItemDto)
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @ApiProperty({ type: [ProfileOrderItemDto] })
    items: ProfileOrderItemDto[];
}
