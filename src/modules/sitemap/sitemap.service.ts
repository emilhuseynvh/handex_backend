import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SitemapLastmodEntity } from "src/entities/sitemap-lastmod.entity";
import { SITEMAP_PAGE_PATHS, SitemapPage } from "src/shares/enums/sitemap-page.enum";
import { Repository } from "typeorm";

@Injectable()
export class SitemapService implements OnModuleInit {
    constructor(
        @InjectRepository(SitemapLastmodEntity)
        private sitemapRepo: Repository<SitemapLastmodEntity>,
    ) { }

    async onModuleInit() {
        await this.seed();
    }

    private async seed() {
        const existing = await this.sitemapRepo.find();
        const existingKeys = new Set(existing.map(item => item.key));
        const now = new Date();

        const missing = Object.values(SitemapPage)
            .filter(key => !existingKeys.has(key))
            .map(key => this.sitemapRepo.create({
                key,
                path: SITEMAP_PAGE_PATHS[key],
                lastmod: now,
            }));

        if (missing.length) {
            await this.sitemapRepo.save(missing);
        }
    }

    async touch(page: SitemapPage) {
        await this.sitemapRepo.upsert(
            { key: page, path: SITEMAP_PAGE_PATHS[page], lastmod: new Date() },
            ['key'],
        );
    }

    async list() {
        const rows = await this.sitemapRepo.find({ order: { id: 'ASC' } });
        return rows.map(row => ({
            key: row.key,
            path: row.path,
            lastmod: row.lastmod,
        }));
    }
}
