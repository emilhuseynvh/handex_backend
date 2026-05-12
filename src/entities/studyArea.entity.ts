import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UploadEntity } from "./upload.entity";
import { TranslationsEntity } from "./translations.entity";
import { ProgramEntity } from "./programs.entity";
import { MetaEntity } from "./meta.entity";
import { FaqEntity } from "./faq.entity";
import { ConsultationEntity } from "./consultation.entity";
import { GroupEntity } from "./group.entity";
import { StatisticEntity } from "./statistic.entity";
import { ProfilesEntity } from "./profile.entity";
import { BrochureEntity } from "./brochure.entity";

@Entity('study_area')
export class StudyAreaEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({ nullable: true })
    hidden: string;

    @Column()
    color: string;

    @Column({ nullable: true, default: 1 })
    order: number;

    @OneToOne(() => UploadEntity, upload => upload.studyArea)
    @JoinColumn({ name: 'imageId', referencedColumnName: 'id' })
    image: UploadEntity;

    @OneToMany(() => TranslationsEntity, translation => translation.studyArea, { cascade: true })
    translations: TranslationsEntity;

    @OneToMany(() => ProfilesEntity, profile => profile.studyArea, { cascade: true })
    profile: ProfilesEntity[];

    @OneToMany(() => StatisticEntity, statistic => statistic.studyArea, { cascade: true })
    statistic: StatisticEntity[];

    @OneToMany(() => FaqEntity, faq => faq.studyArea, { cascade: true })
    faq: FaqEntity[];

    @OneToMany(() => GroupEntity, group => group.studyArea, { cascade: true, nullable: true })
    groups: GroupEntity[];

    @Column()
    model: string;

    @OneToMany(() => ConsultationEntity, consultation => consultation.course, { cascade: true })
    consultation: ConsultationEntity[];

    @OneToMany(() => ProgramEntity, program => program.studyArea, { cascade: true })
    program: ProgramEntity[];

    @OneToMany(() => MetaEntity, meta => meta.studyArea, { cascade: true })
    meta: MetaEntity[];

    @OneToOne(() => BrochureEntity, brochure => brochure.studyArea, { nullable: true })
    @JoinColumn()
    brochure: BrochureEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
