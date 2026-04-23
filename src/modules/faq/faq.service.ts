import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { FaqEntity } from "src/entities/faq.entity";
import { UserEntity } from "src/entities/user.entity";
import { Lang } from "src/shares/enums/lang.enum";
import { faqTranslation, mapTranslation } from "src/shares/utils/translation.util";
import { Repository } from "typeorm";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { TranslationsEntity } from "src/entities/translations.entity";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { StudyAreaEntity } from "src/entities/studyArea.entity";
import { SitemapService } from "../sitemap/sitemap.service";
import { SitemapPage } from "src/shares/enums/sitemap-page.enum";

@Injectable()
export class FaqService {
    constructor(
        @InjectRepository(FaqEntity)
        private faqRepo: Repository<FaqEntity>,

        @InjectRepository(StudyAreaEntity)
        private studyAreaRepo: Repository<StudyAreaEntity>,

        @InjectRepository(TranslationsEntity)
        private translationsRepo: Repository<TranslationsEntity>,

        private cls: ClsService,
        private sitemapService: SitemapService,
    ) { }

    private async touchHomeIfMatches(model?: string) {
        if (model === 'home') await this.sitemapService.touch(SitemapPage.HOME);
    }

    async list(studyArea: number, model: string) {
        let lang = this.cls.get<Lang>('lang');
        let result = await this.faqRepo.find({
            where: {
                model: model,
                translations: { lang },
                studyArea: { id: studyArea }
            },
            relations: ['translations', 'studyArea']
        });

        return result.map(item => mapTranslation(item));
    }

    async create(params: CreateFaqDto) {
        if (params.areaStudy) {
        let check = await this.studyAreaRepo.findOne({ where: { id: params.areaStudy } });

        if (!check) throw new NotFoundException('Study Area is not found');
        }

        let translations = [];
        let newTranslations;

        for (let translation of params.translations) {
            translations.push({
                model: 'faq',
                lang: translation.lang,
                field: 'title',
                value: translation.title
            });

            translations.push({
                model: 'faq',
                lang: translation.lang,
                field: 'description',
                value: translation.description
            });

            newTranslations = this.translationsRepo.create(translations);
        }

        let result = this.faqRepo.create({
            studyArea: params.areaStudy ? { id: params.areaStudy } : undefined,
            model: params.model ? params.model : undefined,
            translations: newTranslations
        });

        await result.save();

        await this.touchHomeIfMatches(params.model);

        return result;
    }

    async update(id: number, params: UpdateFaqDto) {
        const faq = await this.faqRepo.findOne({
            where: { id },
            relations: ['translations']
        });

        if (!faq) throw new NotFoundException('FAQ not found');
        if(params.model) faq.model = params.model        


        if (params.translations && params.translations.length) {
            const updatingLangs = params.translations.map(t => t.lang);

            const translationsToRemove = faq.translations.filter(t =>
                updatingLangs.includes(t.lang)
            );

            if (translationsToRemove.length) {
                await this.translationsRepo.remove(translationsToRemove);
            }

            const newTranslations = params.translations.flatMap(translation => [
                this.translationsRepo.create({
                    model: 'faq',
                    lang: translation.lang,
                    field: 'title',
                    value: translation.title
                }),
                this.translationsRepo.create({
                    model: 'faq',
                    lang: translation.lang,
                    field: 'description',
                    value: translation.description
                })
            ]);

            const savedTranslations = await this.translationsRepo.save(newTranslations);

            faq.translations = [
                ...faq.translations.filter(t => !updatingLangs.includes(t.lang)),
                ...savedTranslations
            ];
        }

        await this.faqRepo.save(faq);

        await this.touchHomeIfMatches(faq.model);

        return {
            message: 'FAQ updated successfully'
        };
    }

    async delete(id: number) {
        const faq = await this.faqRepo.findOne({ where: { id } });
        let result = await this.faqRepo.delete(id);

        if (!result.affected) throw new NotFoundException('FAQ is not found');

        await this.touchHomeIfMatches(faq?.model);

        return {
            message: 'FAQ deleted succesfully'
        };
    }
}
