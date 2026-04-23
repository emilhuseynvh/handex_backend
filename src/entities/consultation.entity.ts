import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StudyAreaEntity } from "./studyArea.entity";

@Entity('consultation')
export class ConsultationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    company: string;

    @Column({ nullable: true })
    email: string;

    @ManyToOne(() => StudyAreaEntity, study => study.consultation, { onDelete: 'CASCADE' })
    course: StudyAreaEntity;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
