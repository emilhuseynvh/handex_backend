import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudyAreaEntity } from "./studyArea.entity";

@Entity('brochure')
export class BrochureEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @OneToOne(() => StudyAreaEntity, study => study.brochure)
    studyArea: StudyAreaEntity;
}