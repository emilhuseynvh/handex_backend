import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrochureEntity } from "src/entities/brochure.entity";
import { BrochureController } from "./brochure.controller";
import { BrochureService } from "./brochure.service";

@Module({
    imports: [TypeOrmModule.forFeature([BrochureEntity])],
    controllers: [BrochureController],
    providers: [BrochureService]
})
export class BrochureModule {}