import { Controller, Get } from "@nestjs/common";
import { SitemapService } from "./sitemap.service";

@Controller('sitemap')
export class SitemapController {
    constructor(
        private sitemapService: SitemapService,
    ) { }

    @Get('lastmod')
    async list() {
        return await this.sitemapService.list();
    }
}
