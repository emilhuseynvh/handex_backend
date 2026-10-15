import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudyAreaEntity } from "./studyArea.entity";

@Entity('study_area_category')
export class StudyAreaCategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column({ default: 0 })
    order: number;

    @OneToMany(() => StudyAreaEntity, studyArea => studyArea.category)
    studyAreas: StudyAreaEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
