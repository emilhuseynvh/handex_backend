import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SitemapLastmodEntity } from "src/entities/sitemap-lastmod.entity";
import { SitemapController } from "./sitemap.controller";
import { SitemapService } from "./sitemap.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([SitemapLastmodEntity])],
    controllers: [SitemapController],
    providers: [SitemapService],
    exports: [SitemapService],
})
export class SitemapModule { }
