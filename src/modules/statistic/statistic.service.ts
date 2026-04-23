import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { StatisticEntity } from "src/entities/statistic.entity";
import { Lang } from "src/shares/enums/lang.enum";
import { Repository } from "typeorm";
import { CreateStatisticDto } from "./dto/create-statistic.dto";
import { TranslationsEntity } from "src/entities/translations.entity";
import { mapTranslation } from "src/shares/utils/translation.util";
import { UpdateStatisticDto } from "./dto/update-statistic.dto";
import { SitemapService } from "../sitemap/sitemap.service";
import { SitemapPage } from "src/shares/enums/sitemap-page.enum";

@Injectable()
export class StatisticService {
    constructor(
        @InjectRepository(StatisticEntity)
        private statisticRepo: Repository<StatisticEntity>,

        @InjectRepository(TranslationsEntity)
        private translationRepo: Repository<TranslationsEntity>,

        private cls: ClsService,
        private sitemapService: SitemapService,
    ) { }

    private async touchCorporateIfMatches(field?: string) {
        if (field === 'corporate') await this.sitemapService.touch(SitemapPage.CORPORATE);
    }

    async list(field: string) {
        const lang = this.cls.get<Lang>('lang');
        let result = await this.statisticRepo.find({
            where: {
                field,
                translations: {
                    lang
                }
            }
        });

        return result.map(mapTranslation);
    }

    async create(params: CreateStatisticDto) {
        let result = this.statisticRepo.create({
            field: params.field,
            studyArea: params.studyArea ? { id: params.studyArea } : undefined,
            count: params.count,
            translations: params.translations.map(t => (
                this.translationRepo.create({
                    model: 'statistic',
                    field: 'text',
                    lang: t.lang,
                    value: t.value,
                })
            ))
        });

        await result.save();

        await this.touchCorporateIfMatches(params.field);

        return result;
    }

    async update(id: number, params: UpdateStatisticDto) {
        let statistic = await this.statisticRepo.findOne({ where: { id } });

        if (!statistic) throw new NotFoundException('Statistic is not found');

        const previousField = statistic.field;

        if (params.count) statistic.count = params.count;
        if (params.field) statistic.field = params.field;

        if (params.translations && params.translations.length) {
            for (let translation of params.translations) {
                let check = statistic.translations.findIndex(item => item.lang === translation.lang);
                const newValue = this.translationRepo.create({
                    model: 'statistic',
                    field: 'text',
                    lang: translation.lang,
                    value: translation.value,
                });
                console.log(newValue);

                if (check !== -1) statistic.translations[check] = newValue;
                else statistic.translations.push(newValue);

                await statistic.save();

                await this.touchCorporateIfMatches(statistic.field);
                if (previousField !== statistic.field) await this.touchCorporateIfMatches(previousField);

                return statistic;
            }
        }

        await this.touchCorporateIfMatches(statistic.field);
        if (previousField !== statistic.field) await this.touchCorporateIfMatches(previousField);
    }

    async delete(id: number) {
        const statistic = await this.statisticRepo.findOne({ where: { id } });
        let result = await this.statisticRepo.delete(id);

        if (!result.affected) throw new NotFoundException('Statistic is not found');

        await this.touchCorporateIfMatches(statistic?.field);

        return {
            message: "Statistic deleted succesfully"
        };
    }
}