import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrochureEntity } from 'src/entities/brochure.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrochureService {
    constructor(
        @InjectRepository(BrochureEntity)
        private brochureRepo: Repository<BrochureEntity>,
    ) { }

    async saveBrochure(file: Express.Multer.File, studyAreaId: number) {
	console.log(file);
        const brochure = this.brochureRepo.create({
            url: `/uploads/brochures/${file.filename}`,
            studyArea: { id: studyAreaId }
        });
        return this.brochureRepo.save(brochure);
    }

    async list(id: number) {
        let result =  this.brochureRepo.findOne({ where: { studyArea: { id } }, order: { id: 'DESC' } });
	if(!result) throw new NotFoundException("Not Found");
	return result;
    }

    async delete(id: number) {
        const result = await this.brochureRepo.delete(id);

        if (!result.affected) throw new NotFoundException('Brochure is not defined');

        return {
            message: 'Brochure is deleted succesfully'
        };
    }
}
